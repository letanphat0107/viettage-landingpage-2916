import json
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
    page = browser.new_page(viewport={'width':1440,'height':1000})
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.goto('http://localhost:4200', wait_until='networkidle')
    page.get_by_role('button',name='Tạm dừng banner',exact=True).click()
    page.get_by_role('button',name='Banner 2',exact=True).click()
    page.get_by_role('heading',name='Gìn giữ gốc Việt. Nâng niu từng vị.').wait_for()
    page.get_by_role('button',name='Tìm sản phẩm',exact=True).click()
    page.get_by_role('textbox',name='Tên gia vị',exact=True).fill('tieu')
    assert page.locator('.search-results button').count() == 1
    page.keyboard.press('Escape')
    assert not page.locator('dialog').evaluate('(d)=>d.open')
    page.goto('http://localhost:4200/san-pham',wait_until='networkidle')
    page.get_by_role('button',name='Tiêu & ớt',exact=True).click()
    assert page.locator('.product-card').count()==2
    page.get_by_label('Lọc theo món ăn').select_option('Món kho')
    assert page.locator('.product-card').count()==1
    page.locator('.product-card').click()
    page.get_by_role('heading',name='Tiêu đen nguyên hạt',exact=True).wait_for()
    page.goto('http://localhost:4200/cong-thuc/thit-kho',wait_until='networkidle')
    page.get_by_role('button',name='Lưu công thức',exact=True).click()
    page.reload(wait_until='networkidle')
    assert page.get_by_role('button',name='Đã lưu trên thiết bị',exact=True).count()==1
    page.goto('http://localhost:4200/diem-ban',wait_until='networkidle')
    page.get_by_label('Tỉnh / thành phố').select_option('Hà Nội')
    assert 'Hà Nội' in page.locator('.store-empty').inner_text()
    page.goto('http://localhost:4200/lien-he',wait_until='networkidle')
    page.get_by_label('Họ và tên',exact=True).fill('Khách thử nghiệm')
    page.get_by_label('Email',exact=True).fill('test@example.com')
    page.get_by_label('Nhu cầu hợp tác',exact=True).fill('Quan tâm phân phối gia vị')
    page.get_by_role('checkbox').check()
    page.get_by_role('button',name='Xem bước hoàn tất',exact=True).click()
    assert 'chưa được gửi hoặc lưu lên máy chủ' in page.locator('.form-confirm').inner_text()
    page.get_by_role('button',name='Chuyển động: Bật',exact=True).click()
    assert page.locator('html').get_attribute('data-motion')=='off'
    page.goto('http://localhost:4200/',wait_until='networkidle')
    assert page.get_by_role('button',name='Tạm dừng banner',exact=True).is_disabled()
    mobile = browser.new_page(viewport={'width':390,'height':844}, reduced_motion='reduce')
    for route in ['/','/san-pham','/cau-chuyen','/cong-thuc','/diem-ban','/lien-he','/san-pham/nuoc-mam','/cong-thuc/thit-kho']:
        mobile.goto('http://localhost:4200'+route,wait_until='networkidle')
        assert mobile.evaluate('document.documentElement.scrollWidth <= window.innerWidth'),route
        assert mobile.locator('html').get_attribute('data-motion')=='off'
        assert mobile.locator('h1').count()==1,route
    mobile.goto('http://localhost:4200',wait_until='networkidle')
    mobile.get_by_role('button',name='Mở menu',exact=True).click()
    mobile.locator('nav').get_by_role('link',name='Sản phẩm',exact=True).click()
    assert mobile.url.endswith('/san-pham')
    assert mobile.locator('nav').get_attribute('class')!='open'
    assert not errors,errors
    print(json.dumps({'result':'PASS','browser_errors':errors,'checks':['hero controls','search normalization and escape','category and dish filters','product route','saved recipe persistence','store selector','local form validation flow','global motion switch','OS reduced motion','8 mobile routes no overflow','mobile navigation']},ensure_ascii=False,indent=2))
    browser.close()