import {Loader} from 'lucide-react'

export default function PageLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-indigo-700 to-emerald-400">
      <p className="text-sm text-white bg-linear-to-r from-indigo-800 to-cyan-800 p-4 rounded-xl">
        <Loader className="h-12 w-12 animate-spin [animation-duration:1.5s]"/>
      </p>
    </div>
  );
}