var wd = require('webdriver-client')({
  platformName: 'desktop',
  browserName: 'electron'
})

describe('Weibo', function() {
  this.timeout(60000)
  var driver = wd.initPromiseChain()

  before(function () {
    return driver
      .initDriver()
      .setWindowSize(1024, 800)
  })

  it('访问微博', () => {
    const loginTitle = '我的首页 微博-随时随地发现新鲜事'
    const unloginTitle = '微博-随时随地发现新鲜事'
    return driver
    .get('http://weibo.com')
    .sleep(5000)
    .title()
    .then((title) => {
      title.should.equal(loginTitle)
    })
    .catch((e) => {
      console.log('没有登录，进行登录')
      return driver
      .title()
      .then((title) => {
        // 未登录
        title.should.equal(unloginTitle)
      })
      .elementByCss('[node-type="normal_tab"]')
      .click()
      .sleep(1000)
      .elementByCss('[name="username"]')
      .clear()
      .sleep(1000)
      /* 登录帐号 */
      .sendKeys('YOUR_LOGIN_ID@email.com')
      .sleep(1000)
      .elementByCss('[name="password"]')
      /* 登录密码 */
      .sendKeys('YOUR_PASSWORD')
      .sleep(1000)
      .elementByCss('[node-type="submitBtn"]')
      .click()
      .sleep(5000)
      .title()
      .then((title) => {
        //登录后的标题
        title.should.equal(loginTitle)
      })
    })
  })

  it('微博搜索功能', () => {
    return driver
    .elementByCss('input.W_input')
    .sendKeys('Macaca')
    .sleep(2000)
    .elementByCss('[node-type="searchSubmit"]')
    .click()
    .sleep(5000)
    .elementByCss('.searchInp_form')
    .getAttribute('value')
    .then((value) => {
      value.should.equal('Macaca')
    })
    .back()
    .sleep(3000)
  })

  it('自动填写微博', () => {
    return driver
    .elementByCss('textarea.W_input')
    .clear()
    .sleep(1000)
    .sendKeys('这是一条使用 Macaca（http://macacajs.github.io/macaca/）在 Electron 里面自动发送的微博。')
    .sleep(3000)
    .elementByCss('[node-type="smileyBtn"]')
    .click()
    .sleep(2000)
    .elementByCss('[action-data="insert=%5B%E6%8C%96%E9%BC%BB%5D"]')
    .click()
    .sleep(3000)
    .elementByCss('.W_layer_pop .W_ficon')
    .click()
    .sleep(3000)
  })

  it('发微博', () => {
    return driver
    .elementByCss('[node-type="submit"]')
    // .click()
    .sleep(6000)
  })

  after(function () {
    return driver
      .quit()
  })
})
