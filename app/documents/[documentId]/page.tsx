import Editor from "./editor";
import Navbar from "./navbar";
import { Room } from "./room";
import Toolbar from "./toolbar";

const documentIdPage = async () => {
    return (
        <Room>
            <div className="min-h-screen flex flex-col bg-[#FAFBFD] print:h-auto">
                <div className="flex flex-col px-4 pt-2 gap-2">
                    <Navbar />
                    <Toolbar />
                </div>
                <Editor />
            </div>
        </Room>

    );
};

export default documentIdPage;