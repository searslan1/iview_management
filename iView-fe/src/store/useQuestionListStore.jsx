import { create } from 'zustand';

const useQuestionListStore = create((set, get) => ({
    questions: [],

    // Soruları yerel olarak yükleme fonksiyonu (örnek veri ile başlatma)
    loadQuestions: async () => {
        // API'den veri çekme işlevi (simüle edilmiş örnek veri)
        const fetchedQuestions = [
            { id: '1', packageName: 'Package 1', question: 'What is your name?', time: 1 },
            { id: '2', packageName: 'Package 1', question: 'What is your target?', time: 2 },
            { id: '3', packageName: 'Package 2', question: 'What is your favorite color?', time: 2 },
            { id: '4', packageName: 'Package 2', question: 'What is your idea?', time: 2 },
        ];
        set({ questions: fetchedQuestions });
    },

    // Soru ekleme fonksiyonu
    addQuestion: (newQuestion) => {
        set((state) => ({
            questions: [...state.questions, { id: Date.now().toString(), ...newQuestion }], // Yerel ID ile yeni soruyu ekle
        }));
    },

    // Soru düzenleme fonksiyonu
    editQuestion: (updatedQuestion) => {
        set((state) => ({
            questions: state.questions.map((q) => (q.id === updatedQuestion.id ? { ...q, ...updatedQuestion } : q)),
        }));
    },

    // Soru silme fonksiyonu
    deleteQuestion: (id) => {
        set((state) => ({
            questions: state.questions.filter((q) => q.id !== id),
        }));
    },

    // Paket adıyla soruları alma fonksiyonu
    getQuestionsByPackage: (packageName) => {
        return get().questions.filter(q => q.packageName === packageName);
    },

    // Paketten soru silme fonksiyonu
    deleteQuestionFromPackage: (questionId) => {
        set((state) => ({
            questions: state.questions.filter(q => q.id !== questionId),
        }));
    },

    // Soruları yeniden sıralama fonksiyonu
    reorderQuestions: (activeId, overId) => {
        set((state) => {
            const activeIndex = state.questions.findIndex((q) => q.id === activeId);
            const overIndex = state.questions.findIndex((q) => q.id === overId);

            const newQuestions = [...state.questions];
            const [movedItem] = newQuestions.splice(activeIndex, 1);
            newQuestions.splice(overIndex, 0, movedItem);

            return { questions: newQuestions };
        });
    },
}));

export default useQuestionListStore;
