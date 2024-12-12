import React from 'react';
import Image from 'next/image';

interface MemberProfileProps {
  name: string;
  githubUsername: string;
}

const MemberProfile: React.FC<MemberProfileProps> = ({ name, githubUsername }) => {
  const githubProfileImage = `https://github.com/${githubUsername}.png`;

  return (
    <div className="flex flex-col items-center p-4 m-2 border rounded-lg shadow-md">
      <Image
        src={githubProfileImage}
        alt={`${name}의 프로필 사진`}
        width={130}
        height={130}
        className="rounded-full mb-4"
        priority
      />

      <a
        href={`https://github.com/${githubUsername}`}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-blue-700 transition-colors"
      >
        <h2 className="text-xl font-bold">{name}</h2>
      </a>
    </div>
  );
};

export default MemberProfile;
