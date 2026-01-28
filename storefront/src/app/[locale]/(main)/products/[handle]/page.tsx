"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Heart,
  Share2,
  Star,
  MessageCircle,
  ShieldCheck,
  Truck,
  RotateCcw,
  Flag,
  ThumbsUp,
  Store,
  CheckCircle,
  Check,
  Mail,
  Link2,
} from "lucide-react"
import { useCartContext } from "@/components/providers"
import { toast } from "sonner"

import { listProducts } from "@/lib/data/products"
import { listCategories } from "@/lib/data/categories"
import { listRegions } from "@/lib/data/regions"
import NotFound from "@/app/not-found"

export default function ProductPage() {
  const params = useParams()
  const handle = params.handle as string
  const locale = params.locale as string

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("75%")
  const [selectedColor, setSelectedColor] = useState("Black")
  const [selectedCondition, setSelectedCondition] = useState<"new" | "used">("new")
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(true)
  const [shippingOpen, setShippingOpen] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const [showAllReviews, setShowAllReviews] = useState(false)
  const [helpfulReviews, setHelpfulReviews] = useState<Set<number>>(new Set())
  const [reportDialogOpen, setReportDialogOpen] = useState(false)
  const [reportReason, setReportReason] = useState("")
  const [reportTitle, setReportTitle] = useState("")
  const [reportDescription, setReportDescription] = useState("")
  const [reportSubmitted, setReportSubmitted] = useState(false)
  const [chatDialogOpen, setChatDialogOpen] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const [chatSent, setChatSent] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const [regions, setRegions] = useState<any[]>([])

  const reviewsRef = useRef<HTMLDivElement>(null)

  // Cart context
  const { addToCart } = useCartContext()

  // Fetch product data
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories, regions and product in parallel
        const [{ categories }, regionsData, { response }] = await Promise.all([
          listCategories(),
          listRegions(),
          listProducts({
            countryCode: locale,
            queryParams: { handle: [handle], limit: 1 },
            forceCache: true,
          })
        ])

        setCategories(categories)
        setRegions(regionsData)
        if (response.products[0]) {
          setProduct(response.products[0])
        }
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [handle, locale])

  if (loading) {
    return (
      <div className="flex-1 bg-background w-full">
        <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading product...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return <NotFound />
  }

  if (product.seller?.store_status === "SUSPENDED") {
    return <NotFound />
  }

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? product.images?.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === product.images?.length - 1 ? 0 : prev + 1))
  }

  const scrollToReviews = () => {
    reviewsRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const toggleHelpful = (reviewId: number) => {
    setHelpfulReviews((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId)
      } else {
        newSet.add(reviewId)
      }
      return newSet
    })
  }

  const handleReportSubmit = () => {
    if (reportReason && reportTitle && reportDescription) {
      setReportSubmitted(true)
      setTimeout(() => {
        setReportDialogOpen(false)
        setReportSubmitted(false)
        setReportReason("")
        setReportTitle("")
        setReportDescription("")
      }, 2000)
    }
  }

  const handleChatSend = () => {
    if (chatMessage.trim()) {
      setChatSent(true)
      setTimeout(() => {
        setChatDialogOpen(false)
        setChatSent(false)
        setChatMessage("")
      }, 2000)
    }
  }

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href
    }
    return ""
  }

  const getShareText = () => {
    return `Check out ${product.title} - $${product.variants?.[0]?.calculated_price?.calculated_amount || 'N/A'}`
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl())
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy link")
    }
  }

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}`
    window.open(url, "_blank", "width=600,height=400")
  }

  const handleShareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(getShareUrl())}&text=${encodeURIComponent(getShareText())}`
    window.open(url, "_blank", "width=600,height=400")
  }

  const handleShareWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(getShareText() + " " + getShareUrl())}`
    window.open(url, "_blank")
  }

  const handleShareTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(getShareUrl())}&text=${encodeURIComponent(getShareText())}`
    window.open(url, "_blank")
  }

  const handleShareLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getShareUrl())}`
    window.open(url, "_blank", "width=600,height=400")
  }

  const handleSharePinterest = () => {
    const url = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(getShareUrl())}&media=${encodeURIComponent(product.images?.[0]?.url || "")}&description=${encodeURIComponent(getShareText())}`
    window.open(url, "_blank", "width=600,height=400")
  }

  const handleShareReddit = () => {
    const url = `https://www.reddit.com/submit?url=${encodeURIComponent(getShareUrl())}&title=${encodeURIComponent(getShareText())}`
    window.open(url, "_blank", "width=600,height=400")
  }

  const handleShareEmail = () => {
    const subject = encodeURIComponent(product.title)
    const body = encodeURIComponent(`${getShareText()}\n\n${getShareUrl()}`)
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: getShareText(),
          url: getShareUrl(),
        })
      } catch (err) {
        // User cancelled or share failed
      }
    }
  }

  const sellerReviews = product.seller?.reviews || []
  const displayedReviews = showAllReviews ? sellerReviews : sellerReviews.slice(0, 3)

  // Mock data for sizes, colors - in real app these would come from product variants
  const sizes = ["60%", "65%", "75%", "TKL", "Full"]
  const colors = [
    { name: "Black", value: "#1a1a1a" },
    { name: "White", value: "#ffffff" },
    { name: "Navy", value: "#1e3a5f" },
  ]

  // Mock specifications - in real app these would come from product metadata
  const specifications = [
    { label: "Switch Type", value: "Gateron Pro Red (Hot-swappable)" },
    { label: "Keycaps", value: "Double-shot PBT" },
    { label: "Connectivity", value: "USB-C, Bluetooth 5.0, 2.4GHz" },
    { label: "Battery", value: "4000mAh (up to 200 hours)" },
    { label: "Dimensions", value: "325 x 120 x 40mm" },
    { label: "Weight", value: "980g" },
  ]

  const shipping = {
    free: true,
    estimatedDays: "3-5 business days",
    returns: "30-day returns accepted",
  }

  // Add to cart handler
  const handleAddToCart = async () => {
    if (!product?.variants?.[0]?.id) {
      toast.error("Product variant not available")
      return
    }

    try {
      setIsAddingToCart(true)
      await addToCart({
        variantId: product.variants[0].id,
        quantity,
        countryCode: locale
      })
      toast.success("Item added to cart!")
    } catch (error) {
      console.error("Failed to add item to cart:", error)
      toast.error("Failed to add item to cart. Please try again.")
    } finally {
      setIsAddingToCart(false)
    }
  }

  return (
    <div className="flex-1 bg-background w-full">
      <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
              <img
                src={product.images?.[selectedImage]?.url || "/placeholder.svg"}
                alt={product.title}
                className="h-full w-full object-cover"
              />
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-lg backdrop-blur-sm transition-all hover:bg-background border border-foreground/20"
              >
                <ChevronLeft className="h-5 w-5 text-foreground" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-lg backdrop-blur-sm transition-all hover:bg-background border border-foreground/20"
              >
                <ChevronRight className="h-5 w-5 text-foreground" />
              </button>
              <Badge
                className="absolute top-4 left-4"
                variant={selectedCondition === "new" ? "default" : "secondary"}
              >
                {selectedCondition === "new" ? "New" : "Used"}
              </Badge>
            </div>
            <div className="flex gap-3">
              {product.images?.map((image: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-20 w-20 overflow-hidden rounded-lg border-2 transition-all ${selectedImage === index
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-transparent hover:border-muted-foreground/30"
                    }`}
                >
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={`Product ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{product.brand || "Brand"}</p>
                  <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {product.title}
                  </h1>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="rounded-full border-foreground/20 hover:border-foreground/40"
                  >
                    <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-foreground"}`} />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="rounded-full border-foreground/20 hover:border-foreground/40 bg-transparent">
                        <Share2 className="h-5 w-5 text-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer">
                        {linkCopied ? (
                          <Check className="mr-3 h-4 w-4 text-green-500" />
                        ) : (
                          <Link2 className="mr-3 h-4 w-4" />
                        )}
                        {linkCopied ? "Link Copied!" : "Copy Link"}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleShareFacebook} className="cursor-pointer">
                        <svg className="mr-3 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        Facebook
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleShareTwitter} className="cursor-pointer">
                        <svg className="mr-3 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        X (Twitter)
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleShareWhatsApp} className="cursor-pointer">
                        <svg className="mr-3 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        WhatsApp
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleShareTelegram} className="cursor-pointer">
                        <svg className="mr-3 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                        </svg>
                        Telegram
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleShareLinkedIn} className="cursor-pointer">
                        <svg className="mr-3 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        LinkedIn
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleSharePinterest} className="cursor-pointer">
                        <svg className="mr-3 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
                        </svg>
                        Pinterest
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleShareReddit} className="cursor-pointer">
                        <svg className="mr-3 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                        </svg>
                        Reddit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleShareEmail} className="cursor-pointer">
                        <Mail className="mr-3 h-4 w-4" />
                        Email
                      </DropdownMenuItem>
                      {typeof window !== "undefined" && window.navigator && navigator.share && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={handleNativeShare} className="cursor-pointer">
                            <Share2 className="mr-3 h-4 w-4" />
                            More Options...
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(4.8) // Mock rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted-foreground/30"
                        }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">4.8</span>
                <button
                  onClick={scrollToReviews}
                  className="text-sm text-muted-foreground hover:text-primary hover:underline transition-colors"
                >
                  ({sellerReviews.length} reviews)
                </button>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-foreground">
                ${product.variants?.[0]?.calculated_price?.calculated_amount || 'N/A'}
              </span>
              {product.variants?.[0]?.original_price && product.variants?.[0]?.calculated_price?.calculated_amount !== product.variants?.[0]?.original_price && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.variants?.[0]?.original_price}
                  </span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Save $${product.variants?.[0]?.original_price - product.variants?.[0]?.calculated_price?.calculated_amount}
                  </Badge>
                </>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            <Separator />

            {/* Size Selection */}
            <div>
              <label className="text-sm font-medium text-foreground">
                Size: <span className="text-black font-semibold">{selectedSize}</span>
              </label>
              <div className="mt-3 flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${selectedSize === size
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:border-primary/50"
                      }`}
                  >
                    <span className="text-black font-semibold">{size}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <label className="text-sm font-medium text-foreground">
                Color: <span className="text-muted-foreground">{selectedColor}</span>
              </label>
              <div className="mt-3 flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`h-10 w-10 rounded-full border-2 transition-all ${selectedColor === color.name
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border hover:border-muted-foreground"
                      }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Condition Selection */}
            <div>
              <label className="text-sm font-medium text-foreground">Condition</label>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => setSelectedCondition("new")}
                  className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-all ${selectedCondition === "new"
                    ? "border-black bg-black text-white"
                    : "border-gray-300 bg-white text-black hover:border-gray-400"
                    }`}
                >
                  New
                </button>
                <button
                  onClick={() => setSelectedCondition("used")}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${selectedCondition === "used"
                    ? "border-black bg-black text-white"
                    : "border-gray-300 bg-white text-black hover:border-gray-400"
                    }`}
                >
                  Used
                </button>
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-black">Quantity</label>
              <div className="flex items-center gap-2 rounded-lg border border-border">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-black hover:text-foreground transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-medium text-black">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-black hover:text-foreground transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1 rounded-xl text-base font-semibold bg-black text-white hover:bg-gray-800"
                onClick={handleAddToCart}
                disabled={isAddingToCart}
              >
                {isAddingToCart ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Adding to Cart...
                  </div>
                ) : (
                  "Add to Cart"
                )}
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl text-base font-semibold bg-white text-black border-gray-300 hover:bg-gray-50">
                Buy Now
              </Button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 rounded-xl bg-muted/50 p-4">
              <div className="flex flex-col items-center gap-1 text-center">
                <Truck className="h-5 w-5 text-black" />
                <span className="text-xs font-medium text-black">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <RotateCcw className="h-5 w-5 text-black" />
                <span className="text-xs font-medium text-black">30-Day Returns</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <ShieldCheck className="h-5 w-5 text-black" />
                <span className="text-xs font-medium text-black">Buyer Protection</span>
              </div>
            </div>

            {/* Product Details Collapsible */}
            <Collapsible open={detailsOpen} onOpenChange={setDetailsOpen}>
              <CollapsibleTrigger className="flex w-full items-center justify-between py-4 text-left">
                <span className="text-sm font-semibold uppercase tracking-wide">Product Details</span>
                <Plus className={`h-5 w-5 transition-transform ${detailsOpen ? "rotate-45" : ""}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="pb-4">
                <div className="space-y-3">
                  {specifications.map((spec) => (
                    <div key={spec.label} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{spec.label}</span>
                      <span className="font-medium text-foreground">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Separator />

            {/* Shipping & Returns Collapsible */}
            <Collapsible open={shippingOpen} onOpenChange={setShippingOpen}>
              <CollapsibleTrigger className="flex w-full items-center justify-between py-4 text-left">
                <span className="text-sm font-semibold uppercase tracking-wide text-black">Shipping & Returns</span>
                <Plus className={`h-5 w-5 transition-transform text-black ${shippingOpen ? "rotate-45" : ""}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="pb-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-green-600" />
                    <span className="text-black">{shipping.free ? "Free shipping" : "Calculated at checkout"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-black">Estimated delivery:</span>
                    <span className="font-medium text-black">{shipping.estimatedDays}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="h-4 w-4 text-black" />
                    <span className="text-black">{shipping.returns}</span>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>

        {/* Seller Section */}
        <div className="mt-12">
          <Separator className="mb-8" />
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16 border-2 border-border">
                  <AvatarImage src={product.seller?.photo || "/placeholder.svg"} />
                  <AvatarFallback className="text-lg">
                    {product.seller?.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-black">{product.seller?.name}</h3>
                    {product.seller && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        <ShieldCheck className="mr-1 h-3 w-3" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-sm text-black">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="font-medium text-black">4.9</span>
                      <button
                        onClick={scrollToReviews}
                        className="hover:text-primary hover:underline transition-colors text-black"
                      >
                        ({sellerReviews.length} reviews)
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-black">
                    <span className="flex items-center gap-1">
                      <Store className="h-3 w-3" />
                      {product.seller?.products?.length || 0} sales
                    </span>
                    <span>Member since {new Date(product.seller?.created_at).getFullYear()}</span>
                    <span>Usually responds within 1 hour</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Link href={`/seller/${product.seller?.id}`}>
                  <Button variant="outline" className="rounded-xl bg-white text-black border-gray-300 hover:bg-gray-50 gap-2">
                    <Store className="h-4 w-4" />
                    Visit Store
                  </Button>
                </Link>
                <Dialog open={chatDialogOpen} onOpenChange={setChatDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="rounded-xl bg-black text-white hover:bg-gray-800">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Chat with Seller
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    {chatSent ? (
                      <div className="flex flex-col items-center justify-center py-8">
                        <div className="rounded-full bg-green-100 p-3 mb-4">
                          <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">Message Sent!</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {product.seller?.name} will respond soon.
                        </p>
                      </div>
                    ) : (
                      <>
                        <DialogHeader>
                          <DialogTitle>Message {product.seller?.name}</DialogTitle>
                          <DialogDescription>
                            Send a message about this product. Usually responds within 1 hour.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                            <img
                              src={product.images?.[0]?.url || "/placeholder.svg"}
                              alt={product.title}
                              className="h-12 w-12 rounded-md object-cover"
                            />
                            <div>
                              <p className="text-sm font-medium">{product.title}</p>
                              <p className="text-sm text-muted-foreground">
                                ${product.variants?.[0]?.calculated_price?.calculated_amount || 'N/A'}
                              </p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="chat-message">Your Message</Label>
                            <Textarea
                              id="chat-message"
                              placeholder="Hi, I'm interested in this product. Is it still available?"
                              value={chatMessage}
                              onChange={(e) => setChatMessage(e.target.value)}
                              className="min-h-[120px] resize-none"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setChatDialogOpen(false)}
                            className="bg-transparent"
                          >
                            Cancel
                          </Button>
                          <Button onClick={handleChatSend} disabled={!chatMessage.trim()}>
                            Send Message
                          </Button>
                        </DialogFooter>
                      </>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12" ref={reviewsRef}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">Seller Reviews</h2>
            <Button
              variant="ghost"
              className="text-sm text-muted-foreground"
              onClick={() => setShowAllReviews(!showAllReviews)}
            >
              {showAllReviews ? "Show less" : "View all reviews"}
              <ChevronRight
                className={`ml-1 h-4 w-4 transition-transform ${showAllReviews ? "rotate-90" : ""}`}
              />
            </Button>
          </div>
          <div className="mt-6 space-y-6">
            {displayedReviews.map((review: any) => (
              <div key={review.id} className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={review.customer?.first_name ? "" : "/placeholder.svg"} />
                      <AvatarFallback>{review.customer?.first_name?.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">
                          {review.customer?.first_name} {review.customer?.last_name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
                              }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant={helpfulReviews.has(review.id) ? "default" : "ghost"}
                    size="sm"
                    className={`text-xs ${helpfulReviews.has(review.id) ? "" : "text-muted-foreground"}`}
                    onClick={() => toggleHelpful(review.id)}
                  >
                    <ThumbsUp
                      className={`mr-1 h-3 w-3 ${helpfulReviews.has(review.id) ? "fill-current" : ""}`}
                    />
                    Helpful ({12 + (helpfulReviews.has(review.id) ? 1 : 0)})
                  </Button>
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{review.customer_note}</p>
                {review.seller_note && (
                  <div className="mt-4 rounded-lg bg-muted/50 p-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        Seller Response
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(review.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{review.seller_note}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* More from Seller */}
        <div className="mt-12">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">More from this Seller</h2>
            <Link href={`/seller/${product.seller?.id}`}>
              <Button variant="ghost" className="text-sm text-muted-foreground">
                View all
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
            {product.seller?.products?.slice(0, 4).map((sellerProduct: any) => (
              <Link href={`/products/${sellerProduct.handle}`} key={sellerProduct.id} className="group relative">
                <img
                  alt={sellerProduct.title}
                  src={sellerProduct.thumbnail || "/placeholder.svg"}
                  className="aspect-square w-full rounded-md bg-muted object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                />
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-foreground">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {sellerProduct.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">Color</p>
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    ${sellerProduct.variants?.[0]?.calculated_price?.calculated_amount || 'N/A'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Report Listing */}
        <div className="mt-12 flex items-center justify-between border-t border-border pt-6">
          <span className="text-sm text-muted-foreground">Posted: 2 months ago</span>
          <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
                <Flag className="mr-2 h-4 w-4" />
                Report Listing
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              {reportSubmitted ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="rounded-full bg-green-100 p-3 mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Report Submitted</h3>
                  <p className="text-sm text-muted-foreground mt-1 text-center">
                    Thank you for helping keep our marketplace safe.
                  </p>
                </div>
              ) : (
                <>
                  <DialogHeader>
                    <DialogTitle>Report Listing</DialogTitle>
                    <DialogDescription>
                      Help us understand why you're reporting this listing. We'll review it within 24 hours.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="report-reason">Reason for Report</Label>
                      <Select value={reportReason} onValueChange={setReportReason}>
                        <SelectTrigger id="report-reason">
                          <SelectValue placeholder="Select a reason" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="counterfeit">Counterfeit or fake item</SelectItem>
                          <SelectItem value="prohibited">Prohibited item</SelectItem>
                          <SelectItem value="misleading">Misleading description</SelectItem>
                          <SelectItem value="inappropriate">Inappropriate content</SelectItem>
                          <SelectItem value="scam">Potential scam</SelectItem>
                          <SelectItem value="wrong-category">Wrong category</SelectItem>
                          <SelectItem value="duplicate">Duplicate listing</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="report-title">Title</Label>
                      <Input
                        id="report-title"
                        placeholder="Brief summary of the issue"
                        value={reportTitle}
                        onChange={(e) => setReportTitle(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="report-description">Description</Label>
                      <Textarea
                        id="report-description"
                        placeholder="Please provide more details about the issue..."
                        value={reportDescription}
                        onChange={(e) => setReportDescription(e.target.value)}
                        className="min-h-[100px] resize-none"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setReportDialogOpen(false)}
                      className="bg-transparent"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleReportSubmit}
                      disabled={!reportReason || !reportTitle || !reportDescription}
                    >
                      Submit Report
                    </Button>
                  </DialogFooter>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
