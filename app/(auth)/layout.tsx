export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-wash flex items-center justify-center px-[16px]">
      <div className="w-full max-w-[400px] bg-white rounded-sm p-[40px] flex flex-col gap-[32px] shadow-sm">
        <h1 className="text-[24px] font-bold text-brand text-center">히든카이스</h1>
        {children}
      </div>
    </div>
  )
}
