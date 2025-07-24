import { useToast } from "@/src/lib/context/toast-context";
import { useIsMobile } from "../../hooks/use-mobile";

export default function CustomerDashboard() {
    const { showToast } = useToast();
    const isMobile = useIsMobile();

    return (
        <>
            <div>
                {isMobile ? (
                    <p>You're on a mobile device</p>
                ) : (
                    <p>You're on a desktop or tablet</p>
                )}
            </div>
            <div>Customer Stats, Assigned Tasks, etc.</div>
            <div className="space-y-2">
                <button
                    onClick={() =>
                        showToast({ title: 'Success!', description: 'This worked.', type: 'success' })
                    }
                    className="px-4 py-2 bg-green-500 text-white rounded"
                >
                    Success Toast
                </button>

                <button
                    onClick={() =>
                        showToast({ title: 'Error!', description: 'Something went wrong.', type: 'error' })
                    }
                    className="px-4 py-2 bg-red-500 text-white rounded"
                >
                    Error Toast
                </button>

                <button
                    onClick={() =>
                        showToast({ title: 'Info', description: 'Just some info.', type: 'info' })
                    }
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Info Toast
                </button>

                <button
                    onClick={() =>
                        showToast({ title: 'Warning!', description: 'Be careful.', type: 'warning' })
                    }
                    className="px-4 py-2 bg-yellow-500 text-black rounded"
                >
                    Warning Toast
                </button>

                <button
                    onClick={() =>
                        showToast({ title: 'Loading...', description: 'Please wait.', type: 'loading' })
                    }
                    className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                    Loading Toast
                </button>
            </div>
        </>
    );
}