import {CalendarDays, Radio, Star, Trophy} from "lucide-react";

const summaries = [
    {
        label: 'Live Events',
        value: '0',
        detail: 'No Events Currently Live',
        icon: Radio
    },
    {
        label: "Today's Games",
        value: '0',
        detail: 'Waiting for Sports Data',
        icon: CalendarDays
    },
    {
        label: 'Following',
        value: '0',
        detail: 'Favorite Teams and Athletes',
        icon: Star
    }
]

export function DashboardPage() {
    return (
        <div className="dashboard-page">
            <section className="page-heading">
                <div>
                    <p className="page-eyebrow">Overview</p>
                    <h2>Your Sports Dashboard</h2>
                    <p>
                        Follow Live Games, Leagues, Teams, and Athletes from One Place
                    </p>
                </div>
            </section>

            <section className="summary-grid" aria-label="Sports Summary">
                {summaries.map((summary) => {
                    const Icon = summary.icon;

                    return (
                        <article className="summary-card" key={summary.label}>
                            <div className="summary-icon">
                                <Icon size={21} aria-hidden="true"/>
                            </div>

                            <div>
                                <p>{summary.label}</p>
                                <strong>{summary.value}</strong>
                                <span>{summary.detail}</span>
                            </div>
                        </article>
                    )
                })}
            </section>

            <section className="content-card empty-dashboard">
                <div className="empty-icon">
                    <Trophy size={28} aria-hidden="true"/>
                </div>

                <h3>Sports Data Comes Next...</h3>

                <p>
                    Desktop Shell Ready
                </p>
            </section>
        </div>
    )
}