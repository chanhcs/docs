import Editor from "./editor";
import Navbar from "./navbar";
import Toolbar from "./toolbar";

interface DocumentIdPageProps {
    params: Promise<{ documentId: string }>
}

const documentIdPage = async ({ params }: DocumentIdPageProps) => {
    const { documentId } = await params;
    return (
        <div className="min-h-screen flex flex-col bg-[#FAFBFD] print:h-auto">
            <div className="flex flex-col px-4 pt-2 gap-2">
                <Navbar />
                <Toolbar />
            </div>
            <Editor />
        </div>
    );
};

export default documentIdPage;