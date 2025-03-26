import SnippetContent from './snippet-content';
import SnippetHeader from './snippet-header';

const Snippet = () => {
  return (
    <div className="relative">
      <SnippetHeader />
      <SnippetContent />
    </div>
  );
};

export default Snippet;
