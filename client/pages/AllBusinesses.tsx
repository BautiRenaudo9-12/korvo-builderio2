import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockWalletCards } from "@/lib/data";
import {
  Search,
  Zap,
  TrendingUp,
  ArrowUp,
  MapPin,
  Clock,
  Gift,
  Tag,
  DollarSign,
  CheckCircle,
  Trash2,
  X,
  Bell,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { WalletCard } from "@/types";

type SortOption = "name" | "points";

interface ClaimedItem {
  id: string;
  type: "money" | "reward" | "discount";
  businessId: number;
  businessName: string;
  title: string;
  value: string;
  date: string;
}

export default function AllBusinesses() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState<WalletCard | null>(
    null
  );
  const [sortBy, setSortBy] = useState<SortOption>("points");
  const [pointsToRedeem, setPointsToRedeem] = useState<number>(0);
  const [claimedItems, setClaimedItems] = useState<ClaimedItem[]>([]);
  const [showClaimedModal, setShowClaimedModal] = useState(false);
  const [selectedClaimedItem, setSelectedClaimedItem] = useState<ClaimedItem | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmData, setConfirmData] = useState<{
    type: "money" | "reward" | "discount";
    title: string;
    value: string;
    cost: number;
    pointsAfter?: number;
  } | null>(null);

  useEffect(() => {
    if (id) {
      const business = mockWalletCards.find((b) => b.id === Number(id));
      setSelectedBusiness(business || null);
    } else {
      setSelectedBusiness(null);
    }
  }, [id]);

  const filteredAndSorted = useMemo(() => {
    let filtered = mockWalletCards.filter(
      (b) =>
        b.shop.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "points":
          return b.ptsBalance - a.ptsBalance;
        case "name":
          return a.shop.localeCompare(b.shop);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, sortBy]);

  const handleClaimMoney = (points: number, money: number) => {
    const newItem: ClaimedItem = {
      id: Date.now().toString(),
      type: "money",
      businessId: selectedBusiness!.id,
      businessName: selectedBusiness!.shop,
      title: `$${money.toFixed(2)}`,
      value: `${points} pts`,
      date: new Date().toLocaleDateString("es-ES"),
    };
    setClaimedItems([...claimedItems, newItem]);
    setPointsToRedeem(0);
  };

  const confirmClaimMoney = (points: number, money: number) => {
    setConfirmData({
      type: "money",
      title: "Dinero en Efectivo",
      value: `$${money.toFixed(2)}`,
      cost: points,
      pointsAfter: selectedBusiness!.ptsBalance - points,
    });
    setShowConfirmDialog(true);
  };

  const executeClaimMoney = () => {
    if (confirmData && confirmData.type === "money") {
      handleClaimMoney(confirmData.cost, parseFloat(confirmData.value.replace("$", "")));
      setShowConfirmDialog(false);
      setConfirmData(null);
    }
  };

  const handleClaimReward = (reward: { id: string; name: string; cost: number }) => {
    const newItem: ClaimedItem = {
      id: Date.now().toString() + reward.id,
      type: "reward",
      businessId: selectedBusiness!.id,
      businessName: selectedBusiness!.shop,
      title: reward.name,
      value: `${reward.cost} pts`,
      date: new Date().toLocaleDateString("es-ES"),
    };
    setClaimedItems([...claimedItems, newItem]);
  };

  const confirmClaimReward = (reward: { id: string; name: string; cost: number }) => {
    setConfirmData({
      type: "reward",
      title: reward.name,
      value: reward.name,
      cost: reward.cost,
      pointsAfter: selectedBusiness!.ptsBalance - reward.cost,
    });
    setShowConfirmDialog(true);
  };

  const executeClaimReward = () => {
    if (confirmData && confirmData.type === "reward") {
      const reward = selectedBusiness!.rewards.find(r => r.name === confirmData.title && r.cost === confirmData.cost);
      if (reward) {
        handleClaimReward(reward);
        setShowConfirmDialog(false);
        setConfirmData(null);
      }
    }
  };

  const handleClaimDiscount = (discount: string, cost: number) => {
    const newItem: ClaimedItem = {
      id: Date.now().toString() + discount,
      type: "discount",
      businessId: selectedBusiness!.id,
      businessName: selectedBusiness!.shop,
      title: discount,
      value: `${cost} pts`,
      date: new Date().toLocaleDateString("es-ES"),
    };
    setClaimedItems([...claimedItems, newItem]);
  };

  const confirmClaimDiscount = (discount: string, cost: number) => {
    setConfirmData({
      type: "discount",
      title: discount,
      value: discount,
      cost: cost,
      pointsAfter: selectedBusiness!.ptsBalance - cost,
    });
    setShowConfirmDialog(true);
  };

  const executeClaimDiscount = () => {
    if (confirmData && confirmData.type === "discount") {
      handleClaimDiscount(confirmData.title, confirmData.cost);
      setShowConfirmDialog(false);
      setConfirmData(null);
    }
  };

  const handleDeleteClaimed = (itemId: string) => {
    setClaimedItems(claimedItems.filter((item) => item.id !== itemId));
  };

  if (selectedBusiness) {
    return (
      <div className="px-6 md:px-8 pt-4 md:pt-8 pb-24 animate-fade-in">
        <button
          onClick={() => navigate("/businesses")}
          className="hidden md:flex items-center gap-1.5 text-foreground/60 hover:text-foreground transition-colors mb-4 text-sm"
        >
          <ArrowUp size={16} className="rotate-180" />
          <span>Volver</span>
        </button>

        {/* Cover Image */}
        <div
          className="w-full h-32 md:h-40 rounded-xl mb-4 bg-cover bg-center relative overflow-hidden shadow-sm"
          style={{
            backgroundImage: `linear-gradient(135deg, ${selectedBusiness.color}40 0%, transparent 100%), url(${selectedBusiness.cover})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>

        {/* Business Title */}
        <div className="mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            {selectedBusiness.shop}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-foreground/50">
            <div className="flex items-center gap-1.5">
              <MapPin size={14} />
              <span>{selectedBusiness.address}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Clock size={14} />
              <span>{selectedBusiness.lastVisit}</span>
            </div>
          </div>
        </div>

        {/* Points Card */}
        <div className="glass-panel rounded-xl p-4 md:p-5 shadow-sm mb-4">
          <p className="text-xs md:text-sm text-foreground/70 font-medium mb-2">
            Puntos Disponibles
          </p>
          <p
            className="text-3xl md:text-4xl font-bold"
            style={{ color: selectedBusiness.color }}
          >
            {selectedBusiness.ptsBalance}
            <span className="text-sm md:text-base font-medium text-foreground/70 ml-2">
              pts
            </span>
          </p>
        </div>

        {/* Claimed Items Button */}
        <div className="mb-4">
          <button
            onClick={() => claimedItems.length > 0 && setShowClaimedModal(true)}
            disabled={claimedItems.length === 0}
            className={`flex items-center justify-between w-full px-4 py-3 backdrop-blur-xl rounded-xl transition-all active:scale-[0.98] shadow-[0_8px_24px_rgba(0,0,0,0.06)] ${
              claimedItems.length > 0
                ? "hover:border-primary/30 cursor-pointer"
                : "opacity-50 cursor-not-allowed"
            }`}
            style={{
              backgroundColor: `hsl(var(--card) / 0.9)`,
              borderColor: claimedItems.length > 0 ? `hsl(var(--border))` : `hsl(var(--border) / 0.5)`,
              border: '1px solid',
            }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle size={16} style={{ color: "hsl(var(--primary))" }} />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">
                  Reclamados
                </p>
                <p className="text-[10px] text-foreground/50">
                  {claimedItems.length} {claimedItems.length === 1 ? "item" : "items"}
                </p>
              </div>
            </div>
            <span className="text-foreground/40">›</span>
          </button>
        </div>

        {/* Mini Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {/* Canjear por Dinero */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign size={18} className="text-primary" />
              <h2 className="text-base font-semibold text-foreground">Canjear</h2>
            </div>

            {/* Card */}
            <div
              className="rounded-xl p-4 shadow-[0_8px_24px_rgba(0,0,0,0.06)] space-y-4"
              style={{ backgroundColor: `hsl(var(--card))` }}
            >
              {/* Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground/60">
                  Puntos a canjear
                </label>

                <input
                  type="number"
                  min="0"
                  max={selectedBusiness.ptsBalance}
                  value={pointsToRedeem}
                  onChange={(e) =>
                    setPointsToRedeem(Math.max(0, Number(e.target.value)))
                  }
                  placeholder="0"
                  className="w-full rounded-lg shadow-sm/40 px-3 py-2.5 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition"
                  style={{
                    backgroundColor: `hsl(var(--background))`,
                    borderColor: `hsl(var(--border))`,
                    border: '1px solid',
                  }}
                />

                <p className="text-[10px] text-foreground/50">
                  Disponible: {selectedBusiness.ptsBalance} puntos
                </p>
              </div>

              {/* Resultado */}
              {pointsToRedeem > 0 && (
                <div
                  className="rounded-lg p-3 shadow-sm/40"
                  style={{ backgroundColor: `hsl(var(--muted) / 0.3)` }}
                >
                  <p className="text-xs text-foreground/60 mb-1">Recibirás</p>
                  <p className="text-2xl font-semibold text-foreground tracking-tight">
                    ${(pointsToRedeem / 50).toFixed(2)}
                  </p>
                  <p className="text-[10px] text-foreground/50 mt-0.5">
                    {pointsToRedeem} puntos
                  </p>
                </div>
              )}

              {/* CTA */}
              <button
                onClick={() => {
                  if (
                    pointsToRedeem > 0 &&
                    pointsToRedeem <= selectedBusiness.ptsBalance
                  ) {
                    const money = pointsToRedeem / 50;
                    confirmClaimMoney(pointsToRedeem, money);
                  }
                }}
                disabled={
                  pointsToRedeem <= 0 ||
                  pointsToRedeem > selectedBusiness.ptsBalance
                }
                className="w-full rounded-lg py-2.5 text-sm font-semibold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
                style={{
                  background:
                    pointsToRedeem > 0 &&
                    pointsToRedeem <= selectedBusiness.ptsBalance
                      ? selectedBusiness.color
                      : "#c7c7cc",
                }}
              >
                Canjear
              </button>
            </div>
          </div>

          {/* Premios Disponibles */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Gift size={18} className="text-primary" />
              <h2 className="text-base font-semibold text-foreground">Premios</h2>
            </div>
            <div className="space-y-1.5">
              {selectedBusiness.rewards.slice(0, 3).map((reward) => (
                <div
                  key={reward.id}
                  onClick={() => confirmClaimReward(reward)}
                  className="glass-panel rounded-lg p-2.5 shadow-sm hover:border-primary/30 transition-all cursor-pointer hover:bg-white/[0.02] active:scale-95"
                >
                  <p className="text-sm font-medium text-foreground">
                    {reward.name}
                  </p>
                  <p
                    className="text-xs font-semibold mt-0.5"
                    style={{ color: selectedBusiness.color }}
                  >
                    {reward.cost} pts
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Descuentos Disponibles */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Tag size={18} className="text-primary" />
              <h2 className="text-base font-semibold text-foreground">
                Descuentos
              </h2>
            </div>
            <div className="space-y-1.5">
              <div
                onClick={() => confirmClaimDiscount("10% Descuento", 300)}
                className="glass-panel rounded-lg p-2.5 shadow-sm hover:border-primary/30 transition-all cursor-pointer hover:bg-white/[0.02] active:scale-95"
              >
                <p className="text-sm font-medium text-foreground">
                  10% Descuento
                </p>
                <p className="text-xs font-semibold mt-0.5"
                    style={{ color: selectedBusiness.color }} >300 pts</p>
              </div>
              <div
                onClick={() => confirmClaimDiscount("20% Descuento", 500)}
                className="glass-panel rounded-lg p-2.5 shadow-sm hover:border-primary/30 transition-all cursor-pointer hover:bg-white/[0.02] active:scale-95"
              >
                <p className="text-sm font-medium text-foreground">
                  20% Descuento
                </p>
                <p className="text-xs font-semibold mt-0.5"
                    style={{ color: selectedBusiness.color }}>500 pts</p>
              </div>
              <div
                onClick={() => confirmClaimDiscount("Envío Gratis", 200)}
                className="glass-panel rounded-lg p-2.5 shadow-sm hover:border-primary/30 transition-all cursor-pointer hover:bg-white/[0.02] active:scale-95"
              >
                <p className="text-sm font-medium text-foreground">
                  Envío Gratis
                </p>
                <p className="text-xs font-semibold mt-0.5"
                    style={{ color: selectedBusiness.color }}>200 pts</p>
              </div>
            </div>
          </div>
        </div>

        {/* Claimed Items Modal */}
        <Dialog open={showClaimedModal} onOpenChange={setShowClaimedModal}>
          <DialogContent className="max-w-lg p-0 gap-0">
            <div className="flex flex-col">
              {/* Header */}
              <div className="px-6 pt-6 pb-4 border-b border-border/50">
                <DialogTitle className="text-xl font-semibold text-foreground mb-1">
                  Reclamados
                </DialogTitle>
                <p className="text-sm text-foreground/50">
                  {claimedItems.length} {claimedItems.length === 1 ? "item" : "items"}
                </p>
              </div>

              {/* List */}
              <div className="px-4 py-2 max-h-[60vh] overflow-y-auto">
                <div className="space-y-1">
                  {claimedItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedClaimedItem(item)}
                      className="w-full text-left rounded-xl p-4 hover:bg-foreground/5 transition-colors group active:scale-[0.98]"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {/* Icon */}
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{
                              backgroundColor:
                                item.type === "money"
                                  ? "hsl(var(--success) / 0.1)"
                                  : item.type === "reward"
                                  ? "hsl(var(--primary) / 0.1)"
                                  : "hsl(var(--accent) / 0.1)",
                            }}
                          >
                            {item.type === "money" ? (
                              <DollarSign
                                size={18}
                                style={{ color: "hsl(var(--success))" }}
                              />
                            ) : item.type === "reward" ? (
                              <Gift
                                size={18}
                                style={{ color: "hsl(var(--primary))" }}
                              />
                            ) : (
                              <Tag
                                size={18}
                                style={{ color: "hsl(var(--accent))" }}
                              />
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <p className="text-base font-semibold text-foreground truncate mb-0.5">
                              {item.title}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-foreground/50">
                              <span>{item.businessName}</span>
                              <span>•</span>
                              <span>{item.date}</span>
                            </div>
                          </div>
                        </div>

                        {/* Value & Delete */}
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <p
                            className="text-sm font-semibold whitespace-nowrap"
                            style={{ color: "hsl(var(--primary))" }}
                          >
                            {item.value}
                          </p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClaimed(item.id);
                            }}
                            className="p-2 rounded-lg hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 size={16} className="text-destructive" />
                          </button>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Confirmation Dialog */}
        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent className="max-w-sm p-0 gap-0">
            {confirmData && (
              <div className="flex flex-col">
                {/* Icono */}
                <div className="px-6 pt-8 pb-6 text-center">
                  <div className="mb-6 flex justify-center">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: "hsl(var(--primary) / 0.1)",
                      }}
                    >
                      {confirmData.type === "money" && (
                        <DollarSign
                          size={32}
                          style={{ color: "hsl(var(--primary))" }}
                        />
                      )}
                      {confirmData.type === "reward" && (
                        <Gift
                          size={32}
                          style={{ color: "hsl(var(--primary))" }}
                        />
                      )}
                      {confirmData.type === "discount" && (
                        <Tag
                          size={32}
                          style={{ color: "hsl(var(--primary))" }}
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Lo que recibes */}
                <div className="px-6 pb-4 text-center">
                  <p className="text-xs text-foreground/60 mb-1">Recibirás</p>
                  <p className="text-3xl font-bold text-foreground">
                    {confirmData.value}
                  </p>
                </div>

                {/* Lo que costará */}
                <div className="px-6 pb-4 text-center border-y border-border/50 py-4">
                  <p className="text-xs text-foreground/60 mb-1">Costará</p>
                  <p
                    className="text-2xl font-semibold"
                    style={{ color: "hsl(var(--primary))" }}
                  >
                    {confirmData.cost} pts
                  </p>
                </div>

                {/* Puntos restantes */}
                {confirmData.pointsAfter !== undefined && (
                  <div className="px-6 py-4 text-center">
                    <p className="text-xs text-foreground/60 mb-1">
                      Puntos restantes
                    </p>
                    <p
                      className="text-xl font-semibold"
                      style={{ color: "hsl(var(--primary))" }}
                    >
                      {confirmData.pointsAfter} pts
                    </p>
                  </div>
                )}

                {/* Botones */}
                <div className="px-6 pb-6 pt-4 space-y-2">
                  <Button
                    onClick={() => {
                      if (confirmData?.type === "money") {
                        executeClaimMoney();
                      } else if (confirmData?.type === "reward") {
                        executeClaimReward();
                      } else if (confirmData?.type === "discount") {
                        executeClaimDiscount();
                      }
                    }}
                    className="w-full h-12 rounded-xl font-medium text-base bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Confirmar
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setShowConfirmDialog(false);
                      setConfirmData(null);
                    }}
                    className="w-full h-12 rounded-xl font-medium text-base text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* QR Code Modal */}
        <Dialog
          open={selectedClaimedItem !== null}
          onOpenChange={(open) => {
            if (!open) setSelectedClaimedItem(null);
          }}
        >
          <DialogContent className="max-w-md flex flex-col items-center text-foreground">
            <DialogHeader>
              <DialogTitle>Código QR - {selectedClaimedItem?.title}</DialogTitle>
            </DialogHeader>

            {selectedClaimedItem && (
              <div className="flex flex-col items-center gap-6 py-4">
                <div className="bg-white p-4 rounded-lg">
                  <QRCodeSVG
                    value={selectedClaimedItem.id}
                    size={256}
                    level="H"
                    includeMargin={true}
                  />
                </div>

                <div className="text-center space-y-2">
                  <p className="text-sm text-foreground/60">ID de Canje</p>
                  <p className="text-lg font-mono font-bold text-foreground break-all">
                    {selectedClaimedItem.id}
                  </p>
                </div>

                <div className="w-full space-y-2">
                  <div className="glass-panel rounded-lg p-3 shadow-sm">
                    <p className="text-xs text-foreground/60 mb-1">Tipo</p>
                    <p className="text-sm font-semibold text-foreground">
                      {selectedClaimedItem.type === "money"
                        ? "Dinero en Efectivo"
                        : selectedClaimedItem.type === "reward"
                        ? "Premio"
                        : "Descuento"}
                    </p>
                  </div>
                  <div className="glass-panel rounded-lg p-3 shadow-sm">
                    <p className="text-xs text-foreground/60 mb-1">Valor</p>
                    <p className="text-sm font-semibold text-foreground">
                      {selectedClaimedItem.value}
                    </p>
                  </div>
                  <div className="glass-panel rounded-lg p-3 shadow-sm">
                    <p className="text-xs text-foreground/60 mb-1">Negocio</p>
                    <p className="text-sm font-semibold text-foreground">
                      {selectedClaimedItem.businessName}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-8 pt-4 md:pt-8 pb-24">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Mis Negocios
        </h1>
        <p className="text-muted-foreground text-sm">
          {filteredAndSorted.length} negocio
          {filteredAndSorted.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6 md:mb-8">
        <Search
          size={18}
          className=" absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="text"
          placeholder="Buscar negocio o dirección..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full shadow-sm rounded-lg pl-10 pr-4 py-2.5 md:py-3 text-sm md:text-base"
          style={{
            backgroundColor: `hsl(var(--card))`,
            borderColor: `hsl(var(--border))`,
            border: '1px solid',
          }}
        />
      </div>

      {/* Sort Controls */}
      <div className="flex gap-2 md:gap-3 mb-6 md:mb-8 overflow-x-auto pb-2">
        {(["points", "name"] as SortOption[]).map((option) => {
          const labels = {
            points: "Más Puntos",
            name: "Alfabético",
          };
          const icons = {
            points: Zap,
            name: ArrowUp,
          };
          const Icon = icons[option];

          return (
            <button
              key={option}
              onClick={() => setSortBy(option)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all whitespace-nowrap text-xs md:text-sm font-medium ${
                sortBy === option
                  ? "bg-primary/10 border border-primary/30 text-primary font-semibold"
                  : "bg-secondary shadow-sm text-foreground hover:bg-secondary/60 hover:border-border/70 font-semibold"
              }`}
            >
              <Icon size={14} />
              {labels[option]}
            </button>
          );
        })}
      </div>

      {/* Business List */}
      {filteredAndSorted.length > 0 ? (
        <div className="space-y-3 md:space-y-4">
          {filteredAndSorted.map((business, index) => (
            <button
              key={business.id}
              onClick={() => navigate(`/businesses/${business.id}`)}
              className="w-full text-left glass-panel rounded-xl shadow-sm hover:border-primary/30 transition-all hover:bg-black/[0.02] overflow-hidden group animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="p-4 md:p-5 flex gap-4 md:gap-5">
                {/* Cover Image */}
                <div
                  className="w-20 md:w-24 h-20 md:h-24 rounded-lg flex-shrink-0 bg-cover bg-center relative overflow-hidden shadow-lg"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${business.color}30 0%, transparent 100%), url(${business.cover})`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div
                    className="absolute top-2 right-2 w-3 h-3 rounded-full shadow-lg"
                    style={{ backgroundColor: business.color }}
                  ></div>
                </div>

                {/* Business Info */}
                <div className="flex-1 min-w-0">
                  <div className="mb-3">
                    <h3 className="text-base md:text-lg font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                      {business.shop}
                    </h3>
                    <p className="text-xs md:text-sm text-foreground/60 line-clamp-2">
                      {business.address}
                    </p>
                  </div>

                  {/* Stats Grid */}
                  <div className="flex items-center gap-3 md:gap-4">
                    <div
                      className="backdrop-blur-sm rounded-xl p-2.5 md:p-3 shadow-sm flex-1"
                      style={{ backgroundColor: `hsl(var(--card))` }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[10px] md:text-xs text-foreground/50 font-medium">
                          Puntos
                        </p>
                        {/* Notification badge if can claim reward */}
                        {(() => {
                          const minRewardCost = Math.min(
                            ...business.rewards.map(r => r.cost),
                            200, // Envío Gratis
                            300, // 10% Descuento
                            500  // 20% Descuento
                          );
                          const canClaim = business.ptsBalance >= minRewardCost;
                          return canClaim ? (
                            <div className="relative">
                              <Bell size={12} className="text-primary" />
                              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                            </div>
                          ) : null;
                        })()}
                      </div>
                      <p
                        className="text-base md:text-lg font-bold"
                        style={{ color: business.color }}
                      >
                        {business.ptsBalance}
                      </p>
                    </div>

                    <div
                      className="backdrop-blur-sm rounded-xl p-2.5 md:p-3 shadow-sm/40 shadow-sm flex-1"
                      style={{ backgroundColor: `hsl(var(--card))` }}
                    >
                      <p className="text-[10px] md:text-xs text-foreground/50 font-medium mb-1">
                        Avance
                      </p>
                      <div
                        className="w-full h-2 rounded-full overflow-hidden"
                        style={{ backgroundColor: `hsl(var(--muted))` }}
                      >
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${
                              (business.stamps / business.total) * 100
                            }%`,
                            backgroundColor: business.color,
                          }}
                        ></div>
                      </div>
                      <p className="text-[10px] text-foreground/40 mt-1">
                        {business.stamps}/{business.total}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-4 md:px-5 py-3 md:py-4 border-t border-border bg-black/[0.01] text-[10px] md:text-xs text-foreground/60 flex items-center justify-between">
                <span>Última visita: {business.lastVisit}</span>
                <span className="text-foreground/60">→</span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Search size={32} className="text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-sm">
            No encontramos negocios que coincidan con tu búsqueda
          </p>
        </div>
      )}
    </div>
  );
}
