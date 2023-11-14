import React, { useState, useEffect } from 'react';
import { Logo } from "../components/Logo";
import { Footer } from "../components/footer";
import axios from 'axios';

export function Contributors() {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await axios.get(
          'https://api.github.com/repos/jll38/njitbytes/contributors'
        );
        setContributors(response.data);
      } catch (error) {
        console.error('Error fetching contributors:', error.message);
      }
    };

    fetchContributors();
  }, []);

  // Function to split contributors into rows with a specified number of columns
  const chunkArray = (array, columns) => {
    const result = [];
    for (let i = 0; i < array.length; i += columns) {
      result.push(array.slice(i, i + columns));
    }
    return result;
  };

  // Define the number of columns for the table
  const columns = 3;

  // Split contributors into rows with the specified number of columns
  const contributorsRows = chunkArray(contributors, columns);

  return (
    <div>
      <div className="p-[4rem] pb-[15rem] h-screen w-full flex flex-col justify-center items-center">
        <Logo includeChip={false} />
        <img src="/images/github_contributors.png" alt="GitHub Contributors"></img>
        
        {/* Display contributors in a dynamically growing table */}
        <table style={{ borderCollapse: 'collapse' }}>
          <tbody>
            {contributorsRows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((contributor) => (
                  <td key={contributor.login} style={{ padding: '10px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <img
                        src={contributor.avatar_url}
                        alt={`${contributor.login}'s avatar`}
                        style={{ borderRadius: '50%',
                        width: '80px',  // Adjust the size as needed
                        height: '80px', // Adjust the size as needed
                        }}
                      />
                      <br />
                      <a
                        href={contributor.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontWeight: 'bold', textTransform: 'uppercase' }}
                      >
                        {contributor.login}
                      </a>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Footer />
    </div>
  );
}