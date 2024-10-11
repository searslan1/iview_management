import { create } from 'zustand';

const usePackageStore = create((set, get) => ({
    packages: [],
    loadPackages: async () => {
        // Paketleri yükleme işlevi (API'den veri çekme gibi)
        // Örnek veri:
        const fetchedPackages = [
            { id: 1, name: 'Package 1' },
            { id: 2, name: 'Package 2' },
        ];
        set({ packages: fetchedPackages });
    },
    addPackage: (newPackage) => {
        set((state) => ({
            packages: [...state.packages, newPackage],
        }));
    },
    deletePackage: (packageId) => {
        set((state) => ({
            packages: state.packages.filter(pkg => pkg.id !== packageId),
        }));
    },
    reorderPackages: (fromIndex, toIndex) => {
        const updatedPackages = [...get().packages];
        const [movedPackage] = updatedPackages.splice(fromIndex, 1);
        updatedPackages.splice(toIndex, 0, movedPackage);
        set({ packages: updatedPackages });
    },
}));

export default usePackageStore;
