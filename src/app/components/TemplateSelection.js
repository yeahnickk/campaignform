import { useRouter } from 'next/navigation';
import { FileText, PlusCircle } from 'lucide-react';

const TemplateSelection = ({ onSelect }) => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">Select Template for Coles</h1>
        <p className="text-center text-gray-600 mb-8">Choose the template you want to use</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Standard Marketing Campaign */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-center mb-4">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Standard Marketing Campaign</h3>
            <p className="text-gray-600 mb-4">Click to use this template</p>
            <button
              onClick={() => onSelect('COLES_STD_MKT_01')}
              className="text-blue-600 hover:text-blue-700 flex items-center"
            >
              Use Template →
            </button>
          </div>

          {/* Transactional Campaign */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-center mb-4">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Transactional Campaign</h3>
            <p className="text-gray-600 mb-4">Click to use this template</p>
            <button
              onClick={() => onSelect('COLES_TRANS_01')}
              className="text-blue-600 hover:text-blue-700 flex items-center"
            >
              Use Template →
            </button>
          </div>

          {/* Add New Template */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-center mb-4">
              <PlusCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Add New Template</h3>
            <p className="text-gray-600 mb-4">Create your own custom template</p>
            <button
              onClick={() => router.push('/add-template')}
              className="text-green-600 hover:text-green-700 flex items-center"
            >
              Create Template →
            </button>
          </div>

          {/* Other existing templates... */}
        </div>
      </div>
    </div>
  );
};

export default TemplateSelection;
