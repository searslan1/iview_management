import React, { useState, useEffect, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useInterviewFetchStore from '../stores/useInterviewFetchStore';
import { useParams, useNavigate } from 'react-router-dom';
import { MdOutlineEmergencyRecording } from "react-icons/md";
import { GiStopSign } from "react-icons/gi";
import { LuTv2 } from "react-icons/lu";
import { BsSkipForwardBtn } from "react-icons/bs";
import useCandidateStore from '../stores/usePersonalFormStore';
import useVideoUploadStore from '../stores/useVideoUploadStore';

const InterviewPage = () => {
  const { surname } = useCandidateStore();
  const { uuid, formId } = useParams();
  const navigate = useNavigate(); // React Router's useNavigate hook
  const { loadInterview_Id, getQuestions } = useInterviewFetchStore();
  const { uploadVideo, isUploading } = useVideoUploadStore();
  const chunksRef = useRef([]);
  const questions = getQuestions();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [videoBlob, setVideoBlob] = useState(null);
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

  const handleStartRecording = () => {
    if (!cameraOn) {
      toast.error("Kamera açık değil!");
      return;
    }

    if (!isRecording && stream) {
      const recorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' });
      chunksRef.current = [];
      setMediaRecorder(recorder);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        if (chunksRef.current.length > 0) {
          const blob = new Blob(chunksRef.current, { type: 'video/webm' });
          setVideoBlob(blob);
        } else {
          toast.error("Video kaydı alınamadı.");
        }
      };

      recorder.start();
      setIsRecording(true);
      startTotalTimer();
      startQuestionTimer();
      
      toast.success("Kayıt başladı.");
    }
  };

  const handleStopRecording = async () => {
    if (isRecording && mediaRecorder) {
      const confirmStop = window.confirm("Mülakatı sonlandırmak istediğinizden emin misiniz?");
      if (confirmStop) {
        mediaRecorder.stop();
        setIsRecording(false);
  
        clearInterval(questionTimerRef.current);
        clearInterval(totalTimerRef.current);
  
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
          setStream(null);
        }
        setCameraOn(false);
  
        mediaRecorder.onstop = async () => {
          if (chunksRef.current.length > 0) {
            const blob = new Blob(chunksRef.current, { type: 'video/webm' });
            setVideoBlob(blob);

            try {
              await uploadVideo(blob, formId);
              toast.success("Video başarıyla yüklendi. Sayfadan çıkabilirsiniz!");
              
              // Yönlendirme işlemi: Video yüklemesi tamamlandığında SuccessPage'e yönlendir
              navigate("/success"); // Success sayfasına yönlendir
            } catch (uploadError) {
              console.error("Upload error:", uploadError);
              toast.error("Video yüklenirken hata oluştu.");
            }
          } else {
            toast.error("Video kaydı alınamadı.");
          }
        };
      }
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
      <ToastContainer /> {/* ToastContainer burada yer almalı */}
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
            <button onClick={handleStartRecording} className="bg-teal-500 text-white px-4 py-2 rounded flex items-center justify-center" disabled={isUploading}>
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
            <div className="text-2xl font-semibold mb-4">
              Merhaba, Sn. {surname}
            </div>
            <p className="text-gray-500">
              Süre: {questions[currentQuestionIndex]?.duration || 0} dakika
            </p>
            <p className="font-bold text-xl mb-2">
              Soru {currentQuestionIndex + 1}: {questions[currentQuestionIndex]?.questionText}
            </p>
          </div>

          <div className="flex justify-end">
            <button onClick={handleSkip} className="bg-blue-500 text-white px-4 py-2 rounded">
              <BsSkipForwardBtn size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
