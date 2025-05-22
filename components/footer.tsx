import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#F7FCFA] border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-xl font-bold text-gray-900 mb-4">サクセスの森</h2>
            <p className="text-gray-600 mb-4">
              カスタマーサクセスを“知る”と“使う”が、ここでつながります。
              <br></br>
              実務にも役立つヒントが、きっと見つかります。
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-gray-700">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-700">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-700">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-700">
                <Mail size={20} />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">コンテンツ</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/guide" className="text-gray-600 hover:text-gray-900">
                  CSってなに？
                </Link>
              </li>
              <li>
                <Link href="/books" className="text-gray-600 hover:text-gray-900">
                  おすすめ本
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-gray-600 hover:text-gray-900">
                  おすすめ記事
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-600 hover:text-gray-900">
                  最新ニュース
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  SaaS成長トレンド
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  サクセスクエスト
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">サイト情報</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  運営者情報
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()}  サクセスの森. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
