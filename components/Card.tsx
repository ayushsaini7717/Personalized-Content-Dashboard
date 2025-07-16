type Props = {
    title: string;
    description: string;
    imageUrl?: string;
    onClick?: () => void;
};
  
const ContentCard = ({ title, description, imageUrl, onClick }: Props) => {
    return (
      <div
        onClick={onClick}
        className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      >
        {imageUrl && (
          <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        )}
        <div className="p-4">
          <h3 className="text-lg font-bold mb-2">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
        </div>
      </div>
    );
};
  
export default ContentCard;
  