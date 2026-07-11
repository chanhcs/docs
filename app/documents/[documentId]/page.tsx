import Editor from "./editor";
import Tiptap from "./editor";

interface DocumentIdPageProps {
    params: Promise<{ documentId: string }>
}

const documentIdPage = async ({ params }: DocumentIdPageProps) => {
    const { documentId } = await params;
    return (
        <div className="h-screen bg-[#FAFBFD]">
            <Editor />
        </div>
    );
};

export default documentIdPage;