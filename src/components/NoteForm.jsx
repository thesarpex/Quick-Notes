import React, {useState} from "react";
import {collection, addDoc, serverTimestamp} from 'firebase/firestore';
import {db} from '../../firebaseconfig';
import { useAuth } from "../context/AuthContext";
import { PenLine } from "lucide-react";

function NoteForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState('');

    const [success, setSuccess] = useState(false);

    const {currentUser} = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if(!title.trim()) {
            return error('Title is required!')
        }

        try{
            setLoading(true);

            await addDoc(collection (db, 'notes'), {
                title:title.trim(),
                content: content.trim(),
                userId: currentUser.uid,
                createdAt: serverTimestamp(),
            });

            setTitle('');
            setContent('');
            setSuccess(true);

            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError('Failed to create note' + err.message)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center mb-4">
                <PenLine className="h-5 w-5 text-indigo-600 mr-2" />
                <h2 className="text-x1 font-semibold text-gray-800">Add a New Note</h2>
            </div>

            {error && 
                <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm">
                    {error}
                </div>
            }

            {success &&
                    <div className="bg-gree-50 text-green-700 p-2 rounded-md mb-4 text-sm">
                        Note Created Successfully!
                    </div>
            }

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                    </label>
                    <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus-ring-indigo-500"
                    placeholder="Note title"
                    maxLength={100}
                    />
                </div>

                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                        Content
                    </label>
                    <textarea
                    id="content"
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Write your note here"
                    rows={4}
                    />
                </div>

                <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ? 'Creating...' : 'Create Note'}
                </button>
            </form>
        </div>
    );
}

export default NoteForm;