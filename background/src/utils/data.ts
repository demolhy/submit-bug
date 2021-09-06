const dataFilter = (timer: any) => {
  if (!timer) return ''
  const date = new Date(Number(timer))
  const dateNumFun = (num: number) => num < 10 ? `0${num}` : num
  const [Y, M, D, h, m, s] = [

    date.getFullYear(),

    dateNumFun(date.getMonth() + 1),

    dateNumFun(date.getDate()),

    dateNumFun(date.getHours()),

    dateNumFun(date.getMinutes()),

    dateNumFun(date.getSeconds())

  ]

  return `${Y}-${M}-${D} ${h}:${m}:${s}` // 一定要注意是反引号，否则无效。



}

export default dataFilter
