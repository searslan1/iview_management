import React from 'react';

const SuccessPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-teal-400">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Mülakatınız Başarıyla Tamamlanmıştır.</h1>
        <p className="text-lg text-gray-600 mb-6">Mülakat katılımınız için teşekkür ederiz!</p>
        <a href="/" className="inline-block px-6 py-2 text-white bg-blue-500 rounded-lg text-lg transition duration-300 hover:bg-blue-400">
          Anasayfaya Dön
        </a>
      </div>
    </div>
  );
}

export default SuccessPage;
