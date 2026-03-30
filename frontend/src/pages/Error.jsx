export function Error() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-surface px-4">
            <title>Error 404</title>
            <div className="text-center">
                <h1 className="font-headline text-7xl font-extrabold tracking-tighter text-on-surface mb-4">
                    404
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary-container mx-auto mb-6 rounded-full" />
                <h2 className="font-headline text-2xl font-semibold text-on-surface-variant mb-2">
                    Page Not Found
                </h2>
                <p className="text-on-surface-variant/60 text-sm mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <a
                    href="/"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-br from-primary to-primary-container text-on-primary font-semibold text-sm rounded-lg hover:brightness-110 transition-all duration-200 no-underline"
                >
                    Back to Home
                </a>
            </div>
        </div>
    )
}