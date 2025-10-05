interface AvatarProps {
  name: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Avatar({ name, size = 'md', className = '' }: AvatarProps) {
  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase()
  }

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  }

  return (
    <div
      className={`
        ${sizeClasses[size]}
        bg-gradient-to-br from-blue-500 to-purple-600 
        rounded-full 
        flex items-center justify-center 
        text-white font-bold 
        shadow-lg 
        border-2 border-white
        ${className}
      `}
    >
      {getInitial(name)}
    </div>
  )
}
