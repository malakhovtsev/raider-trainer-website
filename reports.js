const DEFAULT_ATTENDEES = "Andrii Malakhovtsev, Nathan Tuttle, Fern Badenhop";

const REPORTS = [
    {
        week: "2026-08-31", // the Monday the week starts on
        meetings: 1,
        minutes: 60,
        completed: [
            "Held an introductory team meeting.",
            "Discussed project approaches, including OCR and AprilTags.",
            "Set up development environments and a Python environment.",
            "Researched approaches involved in the project.",
            "Set up the Discord server and GitHub repository.",
            "Started requirements documentation.",
        ],
        planned: [
            "Research project methods and algorithms.",
            "Investigate OCR and pose recognition codebases.",
            "Test OCR and establish feasibility.",
            "Set up the public website repository.",
            "Research and begin the group website content.",
        ],
    },
    {
        week: "2026-09-07",
        meetings: 1,
        minutes: 30,
        attendees: DEFAULT_ATTENDEES,
        completed: [
            'Set up "Requirements_Testing" sheet.',
            'Met around "Requirements_Testing" sheet.',
            'Filled out first phase of the "Requirements_Testing" sheet.',
            "Created a public website repository and hosted initial public facing website on it with GitHub Pages.",
            "Added team section and weekly reports sections to the website.",
            "Worked on website styling for a clean look.",
            "Developed example requirements for core features.",
            "Presented and discussed notes of requirements engineering at team meetings.",
            "Created Use Case Diagram infographic for core feature requirements.",
        ],
        planned: [
            'Continue work on the "Requirements_Testing" sheet.',
            "Look into adding project requirements on the website, pulling information from the requirements sheet.",
            "Expand on Use Case Diagram for more features and users.",
            "Elaborate on requirements for pose recognition and OCR systems.",
            "Test OCR and establish feasibility.",
            'Write "user session" class.',
            "Start software requirements document.",
        ],
    },
];

function makeElement(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
}

function list(items) {
    const ul = makeElement("ul");
    items.forEach((item) => ul.append(makeElement("li", "", item)));
    return ul;
}

function block(title, items) {
    const section = makeElement("section", "report-block");
    section.append(makeElement("h4", "", title), list(items));
    return section;
}

function meta(label, value) {
    const div = makeElement("div");
    div.append(makeElement("span", "meta-label", label), makeElement("strong", "", value));
    return div;
}

function renderReport(report) {
    const [y, m, d] = report.week.split("-").map(Number);
    const date = new Date(y, m - 1, d);

    const entry = makeElement("div", "timeline-entry");

    const dot = makeElement("div", "timeline-dot");
    const year = makeElement("div", "timeline-date", date.toLocaleDateString("en-US", { month: "short", day: "numeric" }));
    year.append(makeElement("small", "", String(y)));

    const article = makeElement("article", "report");

    const metaBar = makeElement("div", "report-meta");
    metaBar.setAttribute("aria-label", "Report details");
    const count = `${report.meetings} meeting${report.meetings === 1 ? "" : "s"} / ${report.minutes} min`;
    metaBar.append(meta("Meetings", count), meta("Meeting attendees", report.attendees || DEFAULT_ATTENDEES));

    const grid = makeElement("div", "report-grid");
    grid.append(block("Work completed", report.completed), block("Planned for next week", report.planned));

    article.append(metaBar, grid);
    entry.append(dot, year, article);
    return entry;
}

const container = document.getElementById("reports");
if (container) {
    const sorted = [...REPORTS].sort((a, b) => b.week.localeCompare(a.week));
    container.append(makeElement("div", "timeline-spine"));
    const entries = makeElement("div", "timeline-entries");
    sorted.forEach((report) => entries.append(renderReport(report)));
    container.append(entries);
}
