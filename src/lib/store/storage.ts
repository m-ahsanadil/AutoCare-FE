// import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// const createNoopStorage = () => {
//     return {
//         getItem(_key: any) {
//             return Promise.resolve(null);
//         },
//         setItem(_key: any, value: any) {
//             return Promise.resolve(value);
//         },
//         removeItem(_key: any) {
//             return Promise.resolve();
//         },
//     };
// };

// // Check if we're in a browser environment
// export const isClient = typeof window !== 'undefined';

// export const storage = isClient ? createWebStorage("local") : createNoopStorage();
