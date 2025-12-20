import React from 'react';
function Card({username}){
return(
    <div class="flex flex-col items-center gap-6 p-7 md:flex-row md:gap-8 rounded-2xl">
        <div class="flex">
            <img class="size-48 shadow-xl rounded-md" alt="" src="https://tailwindcss.com/_next/static/media/cover.de1997f7.png" />
        </div>
        <div class="flex flex-col items-center md:items-start gap-1">
            <span class="text-2xl font-medium">{username}</span>
            <span class="font-medium text-sky-500">The Anti-Patterns</span>

            <div class="flex gap-2 font-medium text-gray-600 dark:text-gray-400">
                <span>No. 4</span>
                <span>·</span>
                <span>2025</span>
            </div>
        </div>
  </div>
)
}

export default Card;