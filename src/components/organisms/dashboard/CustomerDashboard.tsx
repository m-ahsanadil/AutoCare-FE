"use client";
import { useToast } from "@/src/lib/context/toast-context";
import { useIsMobile } from "../../hooks/use-mobile";
import { useAuth } from "@/src/lib/context/auth-provider";



export default function CustomerDashboard() {
    const { showToast } = useToast();
    const isMobile = useIsMobile();
    const { token } = useAuth()



    return (
   <>
      <div>
        {isMobile ? (
          <p>You're on a mobile device</p>
        ) : (
          <p>You're on a desktop or tablet</p>
        )}
      </div>

  
      {/* Toast Buttons */}
      <div className="space-y-2">
        {['success', 'error', 'info', 'warning', 'loading'].map((type) => (
          <button
            key={type}
            onClick={() =>
              showToast({
                title: `${type.charAt(0).toUpperCase() + type.slice(1)}!`,
                description: `This is a ${type} toast.`,
                type: type as any,
              })
            }
            className={`px-4 py-2 rounded ${
              type === 'success'
                ? 'bg-green-500 text-white'
                : type === 'error'
                ? 'bg-red-500 text-white'
                : type === 'info'
                ? 'bg-blue-500 text-white'
                : type === 'warning'
                ? 'bg-yellow-500 text-black'
                : 'bg-gray-500 text-white'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} Toast
          </button>
        ))}
      </div>
    </>
  );
}