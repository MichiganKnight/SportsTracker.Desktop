interface PlaceholderPageProps {
    eyebrow: string
    title: string
    description: string
}

export function PlaceholderPage({ eyebrow, title, description }: PlaceholderPageProps) {
    return (
        <div className="card shadow-sm placeholder-page">
            <div className="card-body">
                <p className="card-title">{eyebrow}</p>
                <h2 className="mb-1">{title}</h2>
                <p className="text-secondary mb-0">{description}</p>
            </div>
        </div>
    )
}