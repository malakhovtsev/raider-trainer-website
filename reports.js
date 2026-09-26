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
    {
        week: "2026-09-14",
        meetings: 1,
        minutes: 60,
        completed: [
            'Created "auth", "pose_track", and "frontend" branches in the project repository.',
            "Created initial validator methods for username and password.",
            "Added timeline items and styling to the team website.",
            "Tested YOLO pre-trained model performance.",
            "Created interface to display OpenCV2 video stream in Qt GUI framework.",
            "Created a new use case diagram using Excalidraw.",
            "Met to complete planned features document and distributed all tasks.",
            "Created hollow login screen, create account screen.",
        ],
        planned: [
            "Have a whiteboard meeting outlining the app, sketching the app, discussing GUI design, and discussing app flow.",
            "Finalize planned features document with every necessary feature claimed.",
            "Look into adding project requirements to the website, possibly synchronizing with online document.",
            "Start on authentication system or local database.",
            "Support multiple video streams and image processing in Qt.",
            "Expand on use case diagram and other development graphics.",
            "Style existing screens to fit sketches.",
            "Create basic icon for application screens.",
            "Create hollow exercise tracking screen to embed video stream.",
            "Start work on a session class for the frontend.",
        ],
    },
    {
        week: "2026-09-21",
        image: {
            src: "docs/images/whiteboard-meeting.png",
            alt: "Whiteboard sketches from the team's app-flow and UI planning meeting",
        },
        // Meetings, work completed, and planned work are coming soon.
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

    if (report.meetings !== undefined) {
        const metaBar = makeElement("div", "report-meta");
        metaBar.setAttribute("aria-label", "Report details");
        const count = `${report.meetings} meeting${report.meetings === 1 ? "" : "s"} / ${report.minutes} min`;
        metaBar.append(meta("Meetings", count), meta("Meeting attendees", report.attendees || DEFAULT_ATTENDEES));
        article.append(metaBar);
    }

    if (report.image) {
        const img = makeElement("img", "report-image");
        img.src = report.image.src;
        img.alt = report.image.alt;
        img.loading = "lazy";
        article.append(img);
    }

    if (report.completed && report.planned) {
        const grid = makeElement("div", "report-grid");
        grid.append(block("Work completed", report.completed), block("Planned for next week", report.planned));
        article.append(grid);
    } else {
        article.append(makeElement("p", "report-pending", "Full report coming soon."));
    }

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
