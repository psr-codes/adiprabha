import { db } from "@/db/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function fetchBookByISBN(isbn) {
    const categories = [
        "Buddhism",
        "Jainism",
        "Psychology",
        "Literature",
        "Bhagavad Gita",
        "Purana",
        "Mathematics",
        "Vedic Maths",
        "Vedanta",
        "Spirituality",
        "Alternative Medicine",
        "Art & Culture",
        "Art and Architecture",
        "History",
        "Ayurveda",
        "Philosophy",
        "Tantra",
        "Astrology",
        "Religious",
        "Sanskrit",
    ];

    try {
        // Normalize the ISBN for case-insensitive comparison
        const normalizedISBN = isbn.trim().toLowerCase();

        // Create an empty array to hold the matching book (if found)
        const matchingBook = [];

        // Loop through categories to find the book
        for (const category of categories) {
            const collectionRef = collection(db, category);
            const querySnapshot = await getDocs(collectionRef);

            if (!querySnapshot.empty) {
                for (const doc of querySnapshot.docs) {
                    const bookData = doc.data();
                    const productISBN = bookData.product?.ISBN?.toLowerCase();

                    // Check if the book ISBN matches (case-insensitive)
                    if (productISBN && productISBN.includes(normalizedISBN)) {
                        matchingBook.push({
                            category: category,
                            id: doc.id,
                            ...bookData,
                        });

                        // Return the array containing the single matching book
                        return matchingBook;
                    }
                }
            }
        }

        // If no book is found, return an empty array
        return matchingBook;
    } catch (error) {
        console.error("Error fetching book by ISBN:", error.message);
        throw error;
    }
}
