import Editor from "./editor";
import Toolbar from "./toolbar";

interface DocumentIdPageProps {
    params: Promise<{ documentId: string }>
}

const documentIdPage = async ({ params }: DocumentIdPageProps) => {
    const { documentId } = await params;
    return (
        <div className="h-screen flex flex-col bg-[#FAFBFD] print:h-auto">
            <div className="px-4 pt-2">
                <Toolbar />
            </div>
            <Editor />
        </div>
    );
};

export default documentIdPage;