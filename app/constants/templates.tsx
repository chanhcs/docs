export const templates = [
    {
        id: "blank",
        label: "Blank Document",
        imageUrl: "/blank.png",
        initialContent: "",
    },
    {
        id: "resume",
        label: "Resume",
        imageUrl: "/resume.png",
        initialContent: `
            <table>
                <tbody>
                    <tr>
                        <td colwidth="396">
                            <h1><span style="font-family: Georgia">Your Name</span></h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </td>
                        <td colwidth="224">
                            <p><span style="color: #666666; font-size: 12px">123 Your Street<br>Your City, ST 12345<br><strong>(123) 456-7890</strong><br>no_reply@example.com</span></p>
                        </td>
                    </tr>
                    <tr>
                        <td colwidth="396">
                            <h2><span style="color: #2563eb; font-size: 14px">EXPERIENCE</span></h2>
                            <p><strong>Company, Location</strong> — <em>Job Title</em></p>
                            <p><span style="color: #888888; font-size: 12px">MONTH 20XX &ndash; PRESENT</span></p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
                            <p><strong>Company, Location</strong> — <em>Job Title</em></p>
                            <p><span style="color: #888888; font-size: 12px">MONTH 20XX &ndash; MONTH 20XX</span></p>
                            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
                            <p><strong>Company, Location</strong> — <em>Job Title</em></p>
                            <p><span style="color: #888888; font-size: 12px">MONTH 20XX &ndash; MONTH 20XX</span></p>
                            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.</p>
                            <h2><span style="color: #2563eb; font-size: 14px">EDUCATION</span></h2>
                            <p><strong>School Name, Location</strong> — <em>Degree</em></p>
                            <p><span style="color: #888888; font-size: 12px">MONTH 20XX &ndash; MONTH 20XX</span></p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                            <p><strong>School Name, Location</strong> — <em>Degree</em></p>
                            <p><span style="color: #888888; font-size: 12px">MONTH 20XX &ndash; MONTH 20XX</span></p>
                            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.</p>
                            <h2><span style="color: #2563eb; font-size: 14px">PROJECTS</span></h2>
                            <p><strong>Project Name</strong> — <em>Detail</em></p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
                        </td>
                        <td colwidth="224">
                            <h2><span style="color: #2563eb; font-size: 14px">SKILLS</span></h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            <p>Sed diam nonummy nibh euismod tincidunt.</p>
                            <p>Lorem dolor magna aliquam erat volutpat.</p>
                            <h2><span style="color: #2563eb; font-size: 14px">AWARDS</span></h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            <p><strong>Nth related incident</strong> — sed diam nonummy nibh euismod tincidunt ut lorem dolore.</p>
                            <p><strong>Nth related incident</strong> — ut wisi enim ad minim veniam, quis nostrud exerci.</p>
                            <h2><span style="color: #2563eb; font-size: 14px">LANGUAGES</span></h2>
                            <p>Lorem ipsum, dolor sit amet, consectetur</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        `,
    },
    {
        id: "recipe",
        label: "Recipe",
        imageUrl: "/recipe.png",
        initialContent: `
            <table>
                <tbody>
                    <tr>
                        <td colwidth="292">
                            <p><span style="color: #999999; font-size: 11px">RECIPE</span></p>
                            <h1><span style="color: #e8434f; font-family: Georgia; font-size: 30px">Strawberry Vanilla Pancakes</span></h1>
                            <img src="/recipe-template.jpg" alt="Strawberry vanilla pancakes" width="272">
                            <p><span style="font-size: 11px">Ready in <strong>20 minutes</strong></span></p>
                            <p><span style="font-size: 11px">Serves <strong>8 people</strong></span></p>
                            <p><span style="font-size: 11px"><strong>280 calories</strong></span></p>
                        </td>
                        <td colwidth="328">
                            <h2><span style="color: #e8434f; font-family: Georgia; font-size: 18px">Ingredients</span></h2>
                            <ul>
                                <li><p><span style="font-size: 11px">Lorem ipsum dolor sit amet</span></p></li>
                                <li><p><span style="font-size: 11px">Consectetuer adipiscing elit</span></p></li>
                                <li><p><span style="font-size: 11px">Suspendisse scelerisque</span></p></li>
                                <li><p><span style="font-size: 11px">Libero interdum auctor</span></p></li>
                            </ul>
                            <h2><span style="color: #e8434f; font-family: Georgia; font-size: 18px">Preparation</span></h2>
                            <ol>
                                <li><p><span style="font-size: 11px"><strong>Lorem ipsum dolor sit amet</strong> consectetuer adipiscing elit sed do tempor incididunt ut labore et dolore magna aliqua.</span></p></li>
                                <li><p><span style="font-size: 11px">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</span></p></li>
                                <li><p><span style="font-size: 11px"><strong>Suspendisse scelerisque mi a mi.</strong> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed dolore eiusmod tempor.</span></p></li>
                                <li><p><span style="font-size: 11px"><strong>Vestibulum ante ipsum primis elementum.</strong> Libero interdum auctor cursus, sapien enim efficitur quam.</span></p></li>
                                <li><p><span style="font-size: 11px"><strong>Phasellus vehicula nonummy nunc.</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation.</span></p></li>
                                <li><p><span style="font-size: 11px">Ullamco laboris nisi ut aliquip ex ea commodo consequat.</span></p></li>
                            </ol>
                            <h2><span style="color: #e8434f; font-family: Georgia; font-size: 18px">Tips</span></h2>
                            <p><span style="font-size: 11px">Lorem ipsum dolor sit amet consectetuer adipiscing elit sed do tempor incididunt ut labore et dolore magna aliqua.</span></p>
                        </td>
                    </tr>
                </tbody>
            </table>
        `,
    },
    {
        id: "letter",
        label: "Letter",
        imageUrl: "/letter.png",
        initialContent: `
            <hr>
            <p><span style="font-size: 12px"><strong>Your Name</strong><br>123 Your Street<br>Your City, ST 12345<br>(123) 456-7890<br>no_reply@example.com</span></p>
            <p></p>
            <p>4th September 20XX</p>
            <p></p>
            <p><strong>Ronny Reader</strong><br>CEO, Company Name<br>123 Address St<br>Anytown, ST 12345</p>
            <p></p>
            <p>Dear Mr. Reader,</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam, est usus legentis in iis qui facit eorum claritatem.</p>
            <p>Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius.</p>
            <p></p>
            <p>Sincerely,</p>
            <p></p>
            <p><span style="color: #16a34a"><strong>Your Name</strong></span></p>
        `,
    },
    {
        id: "project-proposal",
        label: "Project Proposal",
        imageUrl: "/project-proposal.png",
        initialContent: `
            <img src="/project-proposal-template.jpg" alt="Project proposal template" width="620">
            <h1>Project Name</h1>
            <p><span style="color: #888888">01.04.20XX</span></p>
            <hr>
            <table>
                <tbody>
                    <tr>
                        <td colwidth="396">
                            <h2><span style="color: #0f766e; font-size: 14px">OVERVIEW</span></h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                            <h2><span style="color: #0f766e; font-size: 14px">GOALS</span></h2>
                            <ul>
                                <li><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></li>
                                <li><p>Sed do eiusmod tempor incididunt ut labore et dolore.</p></li>
                                <li><p>Ut enim ad minim veniam, quis nostrud exercitation.</p></li>
                            </ul>
                            <h2><span style="color: #0f766e; font-size: 14px">SCOPE</span></h2>
                            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
                            <h2><span style="color: #0f766e; font-size: 14px">NEXT STEPS</span></h2>
                            <ul data-type="taskList">
                                <li data-type="taskItem" data-checked="false"><p>Lorem ipsum dolor sit amet</p></li>
                                <li data-type="taskItem" data-checked="false"><p>Consectetur adipiscing elit</p></li>
                                <li data-type="taskItem" data-checked="false"><p>Sed do eiusmod tempor incididunt</p></li>
                            </ul>
                        </td>
                        <td colwidth="224">
                            <h2><span style="color: #0f766e; font-size: 14px">TIMELINE</span></h2>
                            <p><strong>Phase 1</strong><br><span style="color: #888888; font-size: 12px">Lorem ipsum dolor sit amet</span></p>
                            <p><strong>Phase 2</strong><br><span style="color: #888888; font-size: 12px">Consectetur adipiscing elit</span></p>
                            <p><strong>Phase 3</strong><br><span style="color: #888888; font-size: 12px">Sed do eiusmod tempor</span></p>
                            <h2><span style="color: #0f766e; font-size: 14px">BUDGET</span></h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                            <h2><span style="color: #0f766e; font-size: 14px">CONTACT</span></h2>
                            <p><span style="color: #0f766e"><strong>Your Name</strong></span><br><span style="font-size: 12px">Your Company<br>123 Your Street<br>Your City, ST 12345</span></p>
                        </td>
                    </tr>
                </tbody>
            </table>
        `,
    },
    {
        id: "pet-resume",
        label: "Pet Resume",
        imageUrl: "/pet-resume.png",
        initialContent: `
            <table>
                <tbody>
                    <tr>
                        <td colwidth="292">
                            <h1><span style="color: #00a651; font-size: 32px">Pet Name</span></h1>
                            <p><span style="color: #444444; font-size: 20px">My best friend</span></p>
                            <img src="/pet-resume-template.jpg" alt="Pet photo" width="272">
                            <hr>
                            <p><span style="color: #00a651; font-size: 11px"><strong>Age:</strong></span><span style="font-size: 11px"> 4 years</span></p>
                            <p><span style="color: #00a651; font-size: 11px"><strong>Sex:</strong></span><span style="font-size: 11px"> Male</span></p>
                            <p><span style="color: #00a651; font-size: 11px"><strong>Weight:</strong></span><span style="font-size: 11px"> 33 pounds</span></p>
                            <p><span style="color: #00a651; font-size: 11px"><strong>Breed:</strong></span><span style="font-size: 11px"> Mutt</span></p>
                        </td>
                        <td colwidth="328">
                            <hr>
                            <h2><span style="color: #00a651; font-size: 13px">PERSONALITY</span></h2>
                            <p><span style="font-size: 11px">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</span></p>
                            <p><span style="font-size: 11px">Duis aute irure dolor in reprehenderit. Enim ad minim veniam.</span></p>
                            <hr>
                            <h2><span style="color: #00a651; font-size: 13px">HEALTH &amp; GROOMING</span></h2>
                            <p><span style="font-size: 11px">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</span></p>
                            <p><span style="font-size: 11px">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed dolore eiusmod tempor.</span></p>
                            <p><span style="font-size: 11px">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do tempor incididunt ut labore et dolore magna aliqua.</span></p>
                            <hr>
                            <h2><span style="color: #00a651; font-size: 13px">ABOUT THE OWNER</span></h2>
                            <p><span style="font-size: 11px">Lorem ipsum dolor sit amet, consectetur adipiscing elit, et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed dolore eiusmod tempor incididunt ut aliqua labore et dolore magna aliqua.</span></p>
                        </td>
                    </tr>
                </tbody>
            </table>
        `,
    },
]
