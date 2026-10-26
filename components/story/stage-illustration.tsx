// Original layered process compositions. Decorative: stage headings carry meaning.
export function StageIllustration({ stage }: { stage: number }) {
  return <svg viewBox="0 0 240 160" fill="none" aria-hidden="true" focusable="false">
    {stage === 0 && <>
      <path d="M28 105C17 45 74 10 129 25S221 70 208 122" stroke="#acbad2" strokeDasharray="3 7" />
      <g transform="rotate(-10 85 80)"><path d="M26 23H129V131H26Z" fill="#dde7f5" stroke="#a6bbd9" /><path d="M42 47H98M42 60H111M42 73H87" stroke="#7f99bd" strokeWidth="3" strokeLinecap="round" /><text x="42" y="111" fontFamily="Arial" fontSize="13" fill="#617da5">THE REQUIREMENT</text></g>
      <g transform="rotate(8 168 80)"><path d="M121 40H214V113H169L150 133V113H121Z" fill="#f0e9f7" stroke="#b9a8d1" /><path d="M137 61H192M137 75H186M137 89H172" stroke="#a28bbd" strokeWidth="3" strokeLinecap="round" /></g>
      <path d="M74 117L94 134L134 95" stroke="#86a69a" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="211" cy="27" r="8" fill="#ccddd5" /><circle cx="19" cy="128" r="4" fill="#b5c7e3" />
    </>}
    {stage === 1 && <>
      <path d="M18 121L117 64L222 118L124 155Z" fill="#e8edf6" />
      <path d="M116 52V76M116 76L55 103M116 76L175 103" stroke="#8ea5c5" strokeWidth="2" />
      <g transform="translate(81 4)"><path d="M0 21L36 0L75 21L38 43Z" fill="#e3daf0" stroke="#b6a3cf" /><path d="M0 21V43L38 65L75 43V21L38 43Z" fill="#c9badd" stroke="#b6a3cf" /><path d="M38 43V65" stroke="white" /></g>
      {[20, 142].map((x, i) => <g key={x} transform={`translate(${x} 89)`}><path d="M0 18L34 0L69 18L35 37Z" fill={i ? '#d8e6df' : '#d5e2f4'} stroke="#a0b8cd" /><path d="M0 18V36L35 55L69 36V18L35 37Z" fill={i ? '#afcbbc' : '#b4cae8'} stroke="#a0b8cd" /><path d="M35 37V55" stroke="white" /></g>)}
      <path d="M35 35H62M35 44H54M181 49H210M181 58H200" stroke="#a4b6d0" strokeWidth="3" strokeLinecap="round" />
    </>}
    {stage === 2 && <>
      <g transform="rotate(-9 73 79)"><rect x="22" y="17" width="103" height="125" rx="5" fill="#eef2f8" stroke="#a2b6d3" /><path d="M22 38H125M37 51H110V79H37ZM37 92H67V123H37ZM78 92H110V123H78Z" stroke="#a2b6d3" strokeWidth="2" /><circle cx="33" cy="28" r="3" fill="#b2c6e2" /></g>
      <g transform="rotate(8 169 83)"><rect x="117" y="27" width="101" height="113" rx="7" fill="#fffdfa" stroke="#c0afd8" /><rect x="128" y="39" width="79" height="36" rx="4" fill="#d7c9e9" /><path d="M132 89H190M132 100H180" stroke="#b6c8e1" strokeWidth="4" strokeLinecap="round" /><rect x="130" y="113" width="42" height="14" rx="4" fill="#bfd9cd" /></g>
      <path d="M47 133C85 26 128 158 198 21" stroke="#8d79ae" strokeWidth="2.5" /><path d="M47 133L68 42M163 114L198 21" stroke="#b2a0cc" /><rect x="64" y="38" width="8" height="8" fill="#f4edf9" stroke="#9a83b7" /><rect x="159" y="110" width="8" height="8" fill="#f4edf9" stroke="#9a83b7" />
    </>}
    {stage === 3 && <>
      <g transform="rotate(-7 101 77)"><rect x="17" y="19" width="165" height="110" rx="8" fill="#dbe6f5" stroke="#9bb1d0" /><path d="M17 43H182" stroke="#b3c5df" /><circle cx="31" cy="31" r="3" fill="#91aaca" /><circle cx="43" cy="31" r="3" fill="#b7aacd" /><path d="M34 62H48M60 62H103M47 77H89M102 77H149M47 92H118M34 107H58" stroke="#7896bd" strokeWidth="4" strokeLinecap="round" /><path d="M60 62H103M102 77H149" stroke="#ac97c6" strokeWidth="4" strokeLinecap="round" /></g>
      <g transform="rotate(8 171 106)"><rect x="125" y="77" width="100" height="66" rx="9" fill="#f3f7fb" stroke="#a5bdcf" /><path d="M138 94H180M138 105H166" stroke="#adc4df" strokeWidth="3" strokeLinecap="round" /><rect x="138" y="117" width="48" height="14" rx="4" fill="#c1dbce" /><path d="M193 112L202 117L194 122Z" fill="#779b8c" /></g>
      <path d="M64 137C64 151 106 152 117 136" stroke="#9bbcae" strokeWidth="2" strokeDasharray="4 4" />
    </>}
    {stage === 4 && <>
      <path d="M30 123L111 146L215 98L131 75Z" fill="#e4eee8" />
      <g transform="rotate(-6 116 70)"><rect x="30" y="20" width="179" height="106" rx="8" fill="#f2f6f4" stroke="#acc2b6" /><path d="M30 46H209" stroke="#c2d5cb" /><text x="43" y="37" fontFamily="Arial" fontSize="12" fill="#5e8170">QUALITY / VALIDATION</text>
        {[0,1,2].map(i => <g key={i} transform={`translate(0 ${i * 23})`}><path d="M44 62L49 67L58 57" stroke="#6d9882" strokeWidth="3" strokeLinecap="round" /><path d="M72 62H143" stroke="#a8bfc9" strokeWidth="4" strokeLinecap="round" /><path d="M164 61H192" stroke="#b1c9bb" strokeWidth="4" strokeLinecap="round" /></g>)}
      </g><path d="M15 103C46 142 80 77 102 103S150 142 222 57" stroke="#90acd0" strokeWidth="2.5" /><circle cx="222" cy="57" r="5" fill="#bdcfe7" />
    </>}
    {stage === 5 && <>
      <path d="M16 135C80 159 57 35 136 35C184 35 177 104 224 65" stroke="#d2c4e5" strokeWidth="5" strokeLinecap="round" /><path d="M14 113C69 114 45 13 112 15" stroke="#bfd4c9" strokeWidth="2" strokeDasharray="3 5" />
      <g transform="rotate(-8 90 91)"><path d="M37 65L90 40L142 65L90 92Z" fill="#e2eaf7" stroke="#9fb6d5" /><path d="M37 65V112L90 141L142 112V65L90 92Z" fill="#bfd0e9" stroke="#9fb6d5" /><path d="M90 92V141M67 51L118 78" stroke="#f9fbff" strokeWidth="2" /><path d="M55 103L70 111L80 105" stroke="#7d9fc6" strokeWidth="3" /></g>
      <g transform="rotate(9 186 65)"><path d="M166 28H210V90L188 105L166 90Z" fill="#dfebe4" stroke="#a5c0ae" /><path d="M176 62L185 71L202 49" stroke="#739681" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></g><circle cx="225" cy="26" r="5" fill="#c9badf" />
    </>}
  </svg>;
}