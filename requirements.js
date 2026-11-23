const REQUIREMENTS = [
    {
        title: "Pose Recognition",
        status: "complete",
        assigned: "Nathan R. Tuttle",
        items: [
            { text: "Uses a webcam to monitor and track exercises", status: "complete" },
            { text: "Stores a list of exercises to track", status: "complete" },
            { text: "Evaluates exercise repetitions based on form", status: "complete" },
            { text: "Determines range-of-motion per rep", status: "complete" },
            { text: "Tracks workout progress", status: "complete" },
            { text: "Counts the number of reps per set", status: "complete" },
            { text: "Counts the number of sets per exercise", status: "complete" },
        ],
    },
    {
        title: "Optical Character Recognition",
        status: "complete",
        assigned: "Nathan R. Tuttle",
        items: [
            { text: "Identifies numerical characters visible to the webcam", status: "complete" },
            { text: "Records dumbbell weight based on identified characters", status: "complete" },
            { text: "Falls back to manual entry if OCR fails", status: "complete" },
        ],
    },
    {
        title: "Desktop App UI",
        status: "in-progress",
        assigned: "Fern Badenhop",
        items: [
            { text: "Provides a library of exercises available for tracking", status: "complete" },
            { text: "Library stores a description/illustration and correct-form instructions per exercise", status: "in-progress" },
            { text: "Lets the user plan and set up an explicit exercise routine", status: "complete" },
            { text: "Users may specify the order of exercises", status: "complete" },
            { text: "Users may choose the number of sets per exercise", status: "complete" },
            { text: "Users may set a goal for reps per set", status: "complete" },
            { text: "Users may plan duration of rest intervals", status: "complete" },
            { text: "Shows the workout session stream", status: "in-progress" },
            { text: "Workout screen shows maximum range of motion", status: "in-progress" },
            { text: "Workout screen shows reps and sets", status: "in-progress" },
            { text: "Workout screen shows timer and rest timer", status: "in-progress" },
            { text: "Provides admin users an admin panel", status: "complete" },
            { text: "Admin panel shows a list of all users", status: "complete" },
            { text: "Admin panel shows locked status and an unlock button", status: "complete" },
        ],
    },
    {
        title: "Authentication System",
        status: "complete",
        assigned: "Andrii Malakhovtsev",
        items: [
            { text: "Provides a single login for users and admins", status: "complete" },
            { text: "Username must be exactly 8 lowercase characters", status: "complete" },
            { text: "Password must be exactly 12 characters with 1 upper, 1 lower, 1 numeric, 1 special", status: "complete" },
            { text: "Locks an account after 3 failed login attempts", status: "complete" },
            { text: "Locked accounts require reactivation by an admin", status: "complete" },
        ],
    },
    {
        title: "Local Database",
        status: "complete",
        assigned: "Andrii Malakhovtsev",
        items: [
            { text: "Stores workout progress locally (simple JSONs)", status: "complete" },
            { text: "Fetches workout progress per user to the remote database", status: "complete" },
        ],
    },
    {
        title: "Remote Database",
        status: "complete",
        assigned: "Andrii Malakhovtsev",
        items: [
            { text: "Stores user account names", status: "complete" },
            { text: "Stores user account passwords", status: "complete" },
            { text: "Stores user account locked status", status: "complete" },
            { text: "Stores \"saved workouts\" per user", status: "complete" },
        ],
    },
    {
        title: "Admin System",
        status: "complete",
        assigned: "Andrii Malakhovtsev",
        items: [
            { text: "Admins can view a list of all registered user accounts", status: "complete" },
            { text: "Admins can view whether each account is locked", status: "complete" },
            { text: "Admins can unlock any account", status: "complete" },
        ],
    },
];

const STATUS_LABELS = {
    complete: "Complete",
    "in-progress": "In progress",
    incomplete: "Incomplete",
};

function reqEl(tag, props, children) {
    const node = document.createElement(tag);
    if (props) {
        Object.entries(props).forEach(([key, value]) => {
            if (key === "class") node.className = value;
            else if (key === "text") node.textContent = value;
            else node.setAttribute(key, value);
        });
    }
    (children || []).forEach((child) => node.appendChild(child));
    return node;
}

function statusPill(status) {
    return reqEl("span", { class: `status-pill status-${status}`, text: STATUS_LABELS[status] || status });
}

function renderRequirementsTable(categories) {
    const thead = reqEl("thead", {}, [
        reqEl("tr", {}, [
            reqEl("th", { text: "Requirement" }),
            reqEl("th", { text: "Assigned" }),
            reqEl("th", { text: "Status" }),
        ]),
    ]);

    const tbody = reqEl("tbody");
    categories.forEach((category) => {
        tbody.appendChild(
            reqEl("tr", { class: "requirement-category-row" }, [
                reqEl("td", { text: category.title }),
                reqEl("td", { text: category.assigned }),
                reqEl("td", {}, [statusPill(category.status)]),
            ])
        );

        category.items.forEach((item) => {
            tbody.appendChild(
                reqEl("tr", { class: "requirement-item-row" }, [
                    reqEl("td", { text: item.text, colspan: "2" }),
                    reqEl("td", {}, [statusPill(item.status)]),
                ])
            );
        });
    });

    return reqEl("table", { class: "requirements-table" }, [thead, tbody]);
}

const requirementsContainer = document.getElementById("requirements");
if (requirementsContainer) {
    requirementsContainer.appendChild(renderRequirementsTable(REQUIREMENTS));
}
