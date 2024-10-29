import React, { useState, useEffect, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useInterviewFetchStore from '../stores/useInterviewFetchStore';
import { useParams } from 'react-router-dom';
import { MdOutlineEmergencyRecording } from "react-icons/md";
import { GiStopSign } from "react-icons/gi";
import { LuTv2 } from "react-icons/lu";
import { BsSkipForwardBtn } from "react-icons/bs";
import useCandidateStore from '../stores/usePersonalFormStore';
import useVideoUploadStore from '../stores/useVideoUploadStore';

const InterviewPage = () => {
  const { surname } = useCandidateStore();
  const { uuid } = useParams();
  const { loadInterview_Id, getQuestions } = useInterviewFetchStore();
  const { uploadVideo, isUploading } = useVideoUploadStore();
  const questions = getQuestions();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [videoBlob, setVideoBlob] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [stream, setStream] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(120);
  const [totalTime, setTotalTime] = useState(0);
  const videoRef = useRef(null);
  const questionTimerRef = useRef(null);
  const totalTimerRef = useRef(null);

  useEffect(() => {
    loadInterview_Id(uuid);
  }, [uuid, loadInterview_Id]);

  useEffect(() => {
    if (questions.length > 0) {
      const currentQuestion = questions[currentQuestionIndex];
      if (currentQuestion.duration) {
        setTimeRemaining(currentQuestion.duration * 60);
      }
    }
  }, [questions, currentQuestionIndex]);

  const startQuestionTimer = () => {
    if (questionTimerRef.current) clearInterval(questionTimerRef.current);
    questionTimerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(questionTimerRef.current);
          handleSkip();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startTotalTimer = () => {
    if (totalTimerRef.current) clearInterval(totalTimerRef.current);
    totalTimerRef.current = setInterval(() => {
      setTotalTime((prevTotal) => prevTotal + 1);
    }, 1000);
  };

  const handleCameraToggle = async () => {
    if (!cameraOn) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(stream);
        videoRef.current.srcObject = stream;
        setCameraOn(true);
      } catch (error) {
        console.error("Error accessing media devices: ", error);
        toast.error("Kameraya veya mikrofona erişim sağlanamadı.");
      }
    }
  };

  const handleStopRecording = async () => {
    if (isRecording && mediaRecorder) {
      const confirmStop = window.confirm("Mülakatı sonlandırmak istediğinizden emin misiniz?");
      if (confirmStop) {
        // Stop the recording process
        mediaRecorder.stop();
        setIsRecording(false);
  
        clearInterval(questionTimerRef.current);
        clearInterval(totalTimerRef.current);
  
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
          setStream(null);
        }
        setCameraOn(false);
  
        // Ensure videoBlob is available before upload
        if (videoBlob) {
          console.log("Attempting to upload video...");  // Debugging line
          try {
            const videoUrl = await uploadVideo(videoBlob, uuid);
            setVideoURL(videoUrl);
            if (videoUrl) {
              console.log("Upload success:", videoUrl);  // Debugging line
              toast.success("Video başarıyla yüklendi.");
            } else {
              console.error("Upload failed: No URL returned");
              toast.error("Video yüklenemedi. Lütfen tekrar deneyin.");
            }
          } catch (error) {
            console.error("Upload error:", error);  // Debugging line
            toast.error("Video yüklenemedi. Lütfen tekrar deneyin.");
          }
        } else {
          console.error("Video blob is empty, cannot upload.");
          toast.error("Video kaydı alınamadı.");
        }
      }
    }
  };
  
  const handleStartRecording = () => {
    if (!cameraOn) {
      toast.error("Kamera açık değil!");
      return;
    }
  
    if (!isRecording && stream) {
      const recorder = new MediaRecorder(stream);
      const chunks = []; // Store all chunks here
      setMediaRecorder(recorder);
  
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunks.push(event.data);
      };
  
      recorder.onstop = () => {
        if (chunks.length > 0) {
          const blob = new Blob(chunks, { type: 'video/webm' });
          setVideoBlob(blob);
          const videoUrl = URL.createObjectURL(blob);
          setVideoURL(videoUrl);
        } else {
          console.error("No data available in chunks");
          toast.error("Video kaydı alınamadı.");
        }
      };
  
      recorder.start();
      setIsRecording(true);
      startTotalTimer();
      startQuestionTimer();
    }
  };
  
  const handleSkip = () => {
    if (isRecording && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeRemaining(questions[currentQuestionIndex + 1]?.duration * 60 || 0);
      startQuestionTimer();
    } else if (!isRecording) {
      toast.warn("Kayda başlamadan sonraki soruya geçemezsiniz.");
    }
  };

  return (
    <div className="flex flex-col items-center bg-[#ceebe9] justify-center h-screen">
      <ToastContainer />
      
      {/* Progress Bar */}
      <div className="w-full max-w-5xl bg-gray-200 rounded-full h-4 mb-4">
        <div
          className="bg-yellow-500 h-4 rounded-full"
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        ></div>
         
         
      </div>
  
      <div className="flex w-full max-w-5xl bg-white shadow-2xl rounded-xl p-6 h-[500px] mt-1">
        
        {/* Left side - Video feed */}
        <div className="w-3/4 flex flex-col items-center border-r-2 border-gray-300 pr-4">
        
          <video ref={videoRef} className="w-full rounded-2xl h-[410px] mr-4" autoPlay muted />
          
          <div className="flex justify-between w-full mt-4">
            <button onClick={handleCameraToggle} className="bg-yellow-500 text-white px-4 py-2 rounded mr-6">
              <LuTv2 size={30} />
            </button>
            <button onClick={handleStartRecording} className="bg-teal-500 text-white px-4 py-2 rounded flex items-center justify-center"
             disabled={isUploading}>
              <MdOutlineEmergencyRecording size={30} />
           
            </button>
            <button onClick={handleStopRecording} className="bg-red-500 text-white px-4 py-2 rounded mr-6">
              <GiStopSign size={30} />
            </button>
          </div>
        </div>
  
        {/* Right side - Question and controls */}
        <div className="w-1/2 pl-6 flex flex-col justify-between">
          {/* Timer Section */}
          <div className="flex justify-between items-center mb-4">
            <div className="bg-teal-100 p-2 rounded-md">
              <p>Question Timer: {`${Math.floor(timeRemaining / 60).toString().padStart(2, '0')} : ${(timeRemaining % 60).toString().padStart(2, '0')}`}</p>
            </div>
            <div className="bg-teal-100 p-2 rounded-md">
              <p>Total Timer: {`${Math.floor(totalTime / 60).toString().padStart(2, '0')} : ${(totalTime % 60).toString().padStart(2, '0')}`}</p>
            </div>
          </div>
  
          {/* Question Content */}
          <div className="flex flex-col justify-start flex-1">
            {/* Greeting */}
            <div className="text-2xl font-semibold mb-4">
              Merhaba, Sn. {surname}
            </div>
            <p className="text-gray-500">
              Süre: {questions[currentQuestionIndex]?.duration || 0} dakika
            </p>
            <p className="text-lg font-semibold mb-2">
              {`Soru ${currentQuestionIndex + 1}: ${questions.length > 0 ? questions[currentQuestionIndex].questionText : "Loading question..."}`}
            </p>
          </div>
  
          {/* Controls */}
          <div className="flex justify-center mb-5 mt-4">
            <button onClick={handleSkip} disabled={!isRecording} className="bg-purple-300 px-5 py-3 rounded">
              <BsSkipForwardBtn size={30} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
