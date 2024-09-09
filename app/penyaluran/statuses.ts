import {
  CheckCircledIcon,
  CircleIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
  RocketIcon,
  CircleBackslashIcon,
  CheckIcon
} from "@radix-ui/react-icons"

export const statuses = [
  {
    value: "Menunggu Pembayaran",
    label: "Menunggu Pembayaran",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "Pembayaran Diverifikasi",
    label: "Pembayaran Diverifikasi",
    icon: CircleIcon,
  },
  {
    value: "Naik Cetak",
    label: "Naik Cetak",
    icon: StopwatchIcon,
  },
  {
    value: "Selesai Cetak",
    label: "Selesai Cetak",
    icon: CheckCircledIcon,
  },
  {
    value: "Dikirim",
    label: "Dikirim",
    icon: RocketIcon,
  },
  {
    value: "Diterima",
    label: "Diterima",
    icon: CheckIcon,
  },
  {
    value: "Dibatalkan",
    label: "Dibatalkan",
    icon: CircleBackslashIcon,
  },
]