copy(
  [...new Set(
    [...document.querySelectorAll('a[href*="/product/detail?onlineProdSn="]')]
      .map(a => a.href.startsWith('http') ? a.href : location.origin + a.getAttribute('href'))
  )].join('\n')
)