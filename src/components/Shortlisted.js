import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Background from "./Background";

export default function Shortlisted() {
  const [teams, setTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch("/shortlisted.json")
      .then((response) => response.json())
      .then((data) => setTeams(data))
      .catch((error) => console.error("Error fetching teams:", error));
  }, []);

  const filteredTeams = teams.filter((team) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      team.name.toLowerCase().includes(lowerSearch) ||
      team.leader.toLowerCase().includes(lowerSearch) ||
      team.college.toLowerCase().includes(lowerSearch) ||
      team.category.toLowerCase().includes(lowerSearch)
    );
  });

  const totalPages = Math.ceil(filteredTeams.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTeams = filteredTeams.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="home p-4 md:p-8 text-center min-h-screen flex flex-col justify-center items-center w-full">
      <Background />

      <section className="relative z-10 py-8 px-4 w-full max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-white lg:mb-8 xl:mb-8 sm:mb-4 md:mb-4 mb-4 ">
            Shortlisted Teams
          </h2>
        </motion.div>
 
        <input
          type="text"
          placeholder="Search Teams"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full max-w-sm px-2 py-1.5 md:px-3 md:py-2 mb-4 border border-gray-300 rounded-md text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[300px] rounded-md shadow-lg bg-gray-900 text-white border border-blue-500">
            <thead className="bg-gray-800 border-b border-blue-500">
              <tr className="text-xs sm:text-sm md:text-base">
                <th className="px-2 sm:px-4 py-2 sm:py-3 font-bold border-r border-blue-500 whitespace-nowrap">
                  Team Name
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 font-bold border-r border-blue-500 whitespace-nowrap">
                  Leader
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 font-bold border-r border-blue-500 whitespace-nowrap">
                  Domain
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 font-bold whitespace-nowrap">
                  College
                </th>
              </tr>
            </thead>

            <tbody>
              {currentTeams.map((team) => (
                <tr key={team.id} className="hover:bg-gray-700 transition-colors border-b border-blue-500 text-xs sm:text-sm md:text-base">
                  <td className="px-2 sm:px-4 py-2 sm:py-3 border-r border-blue-500 text-center whitespace-nowrap">
                    {team.name}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 border-r border-blue-500 text-center whitespace-nowrap">
                    {team.leader}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 border-r border-blue-500 text-center whitespace-nowrap">
                    {team.category}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-center whitespace-nowrap">
                    {team.college}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 sm:px-3 sm:py-2 bg-white text-blue-600 border border-blue-600 rounded disabled:opacity-50 text-xs sm:text-sm md:text-base"
            >
              Back
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={`px-2 py-1 sm:px-3 sm:py-2 rounded border border-blue-600 transition-colors text-xs sm:text-sm md:text-base ${
                  pageNumber === currentPage ? "bg-blue-600 text-white" : "bg-white text-blue-600"
                }`}
              >
                {pageNumber}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-2 py-1 sm:px-3 sm:py-2 bg-white text-blue-600 border border-blue-600 rounded disabled:opacity-50 text-xs sm:text-sm md:text-base"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
