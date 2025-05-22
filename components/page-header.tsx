interface PageHeaderProps {
  title: string
  description?: string
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="w-full bg-gradient-to-b from-[#DFF5E1] to-white pt-24 pb-12">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">{title}</h1>
        {description && <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>}
      </div>
    </div>
  )
} 