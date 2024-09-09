import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
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
    value: "dikirim",
    label: "Dikirim",
    icon: RocketIcon,
  },
  {
    value: "diterima",
    label: "Diterima",
    icon: CheckIcon,
  },
  {
    value: "dibatalkan",
    label: "Dibatalkan",
    icon: CircleBackslashIcon,
  },
]

export const priorities = [
  {
    label: "Rendah",
    value: "Rendah",
    icon: ArrowDownIcon,
  },
  {
    label: "Sedang",
    value: "Sedang",
    icon: ArrowRightIcon,
  },
  {
    label: "Tinggi",
    value: "Tinggi",
    icon: ArrowUpIcon,
  },
]

export const payment_options = ["Transfer", "Gopay", "Dana"]