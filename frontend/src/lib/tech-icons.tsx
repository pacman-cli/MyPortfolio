import { FaJava } from 'react-icons/fa'
import { SiDocker, SiMysql, SiNextdotjs, SiPython, SiReact, SiSpringboot, SiTailwindcss, SiTypescript } from 'react-icons/si'

const techIconColors: Record<string, string> = {
  next: 'group-hover:text-white',
  react: 'group-hover:text-cyan-400',
  spring: 'group-hover:text-green-400',
  mysql: 'group-hover:text-blue-400',
  docker: 'group-hover:text-blue-500',
  typescript: 'group-hover:text-blue-500',
  tailwind: 'group-hover:text-cyan-400',
  python: 'group-hover:text-yellow-400',
  java: 'group-hover:text-orange-500',
}

export function getTechIcon(tech: string, sizeClass = 'w-3.5 h-3.5') {
  const t = tech.toLowerCase()
  if (t.includes('next')) return <SiNextdotjs className={sizeClass} />
  if (t.includes('react')) return <SiReact className={sizeClass} />
  if (t.includes('spring')) return <SiSpringboot className={sizeClass} />
  if (t.includes('mysql')) return <SiMysql className={sizeClass} />
  if (t.includes('docker')) return <SiDocker className={sizeClass} />
  if (t.includes('typescript')) return <SiTypescript className={sizeClass} />
  if (t.includes('tailwind')) return <SiTailwindcss className={sizeClass} />
  if (t.includes('python')) return <SiPython className={sizeClass} />
  if (t.includes('java') && !t.includes('javascript')) return <FaJava className={sizeClass} />
  return null
}

export function getTechIconColor(tech: string) {
  const t = tech.toLowerCase()
  for (const [key, val] of Object.entries(techIconColors)) {
    if (t.includes(key)) return val
  }
  return 'group-hover:text-foreground'
}
