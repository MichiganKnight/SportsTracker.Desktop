interface PlaceholderPageProps {
    eyebrow: string;
    title: string;
    description: string;
}

export function PlaceholderPage({ eyebrow, title, description }: PlaceholderPageProps) {
    return (
        <div className="placeholder-page">
            <section className="placeholder-heading">
                <div>
                    <p className="page-eyebrow">{eyebrow}</p>
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
            </section>

            <section className="content-card placeholder-card">
                <h3>{title} is Ready for Development</h3>
                <p>
                    Route Registered
                </p>
            </section>
        </div>
    )
}