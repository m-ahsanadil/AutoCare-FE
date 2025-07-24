import { X, AlertCircle, AlertTriangle, Info } from 'lucide-react';

interface ErrorAlertProps {
    error: string;
    onDismiss: () => void;
}

export const ErrorAlert = ({ error, onDismiss }: ErrorAlertProps) => {
    const getErrorConfig = (errorCode: string) => {
        switch (errorCode) {
            case 'authentication_failed':
                return {
                    title: 'Authentication Failed',
                    message: 'User not found. Please check your credentials.',
                    type: 'error',
                    actionable: true,
                    suggestion: 'Try logging in with a different account or contact support.'
                };
            case 'callback_failed':
                return {
                    title: 'Login Failed',
                    message: 'OAuth callback failed. Please try again.',
                    type: 'error',
                    actionable: true,
                    suggestion: 'If the problem persists, try clearing your browser cache.'
                };
            case 'google_auth_failed':
                return {
                    title: 'Google Login Failed',
                    message: 'Google authentication failed. Please try again.',
                    type: 'error',
                    actionable: true,
                    suggestion: 'Make sure you have a stable internet connection.'
                };
            case 'invalid_password_reset':
                return {
                    title: 'Password Reset Failed',
                    message: 'Invalid password reset token or token has expired.',
                    type: 'warning',
                    actionable: true,
                    suggestion: 'Please request a new password reset link.'
                };
            default:
                return {
                    title: 'Authentication Error',
                    message: `An error occurred: ${errorCode}`,
                    type: 'error',
                    actionable: false,
                    suggestion: 'Please try again or contact support if the problem persists.'
                };
        }
    };

    if (!error) return null;

    const config = getErrorConfig(error);
    const isError = config.type === 'error';
    const isWarning = config.type === 'warning';

    const IconComponent = isError ? AlertCircle : isWarning ? AlertTriangle : Info;

    return (
        <div className={`${isError ? 'bg-red-50 border-red-200 text-red-700' :
            isWarning ? 'bg-yellow-50 border-yellow-200 text-yellow-700' :
                'bg-blue-50 border-blue-200 text-blue-700'
            } border px-4 py-3 rounded-md relative`}>

            {/* Close button */}
            <button
                onClick={onDismiss}
                className={`absolute top-2 right-2 ${isError ? 'text-red-400 hover:text-red-600' :
                    isWarning ? 'text-yellow-400 hover:text-yellow-600' :
                        'text-blue-400 hover:text-blue-600'
                    } transition-colors`}
                aria-label="Dismiss error"
            >
                <X size={16} />
            </button>

            <div className="flex">
                {/* Icon */}
                <div className="flex-shrink-0">
                    <IconComponent
                        size={20}
                        className={`${isError ? 'text-red-400' :
                            isWarning ? 'text-yellow-400' :
                                'text-blue-400'
                            }`}
                    />
                </div>

                {/* Content */}
                <div className="ml-3 flex-1">
                    <h3 className={`text-sm font-medium ${isError ? 'text-red-800' :
                        isWarning ? 'text-yellow-800' :
                            'text-blue-800'
                        }`}>
                        {config.title}
                    </h3>
                    <div className={`mt-1 text-sm ${isError ? 'text-red-700' :
                        isWarning ? 'text-yellow-700' :
                            'text-blue-700'
                        }`}>
                        <p>{config.message}</p>
                        {config.suggestion && (
                            <p className="mt-1 font-medium">{config.suggestion}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};