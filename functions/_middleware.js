// ============================================
// 通用 Pages Functions 加密中间件
// 适用于：VitePress / Next.js / Nuxt / Astro / Vue / React 等任何框架
// ============================================

const PROTECTED_PREFIX = '/secret';  // 🔒 需要加密的路径前缀

// ===== 自适应登录页 HTML =====
const LOGIN_PAGE = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes">
    <title>验证访问</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            min-height: 100vh;
            min-height: 100dvh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f5f7fa;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
                         'PingFang SC', 'Microsoft YaHei', sans-serif;
            padding: 20px;
            overflow: hidden;
        }
        
        .login-container {
            background: #ffffff;
            padding: 48px 40px;
            border-radius: 16px;
            width: 100%;
            max-width: 400px;
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.06);
            border: 1px solid #e8ecf1;
            transition: all 0.3s ease;
        }
        
        .login-header {
            margin-bottom: 32px;
            text-align: center;
        }
        
        .lock-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 56px;
            height: 56px;
            margin-bottom: 16px;
            border: 2px solid #d0d5dd;
            border-radius: 50%;
            font-size: 24px;
            color: #6b7280;
            transition: border-color 0.3s ease;
        }
        
        .login-header h1 {
            font-size: 22px;
            font-weight: 600;
            color: #1a1a1a;
            letter-spacing: -0.3px;
            margin-bottom: 8px;
        }
        
        .login-header p {
            font-size: 14px;
            color: #8c8f96;
            font-weight: 400;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            font-size: 13px;
            font-weight: 500;
            color: #374151;
            margin-bottom: 6px;
        }
        
        .form-group input {
            width: 100%;
            padding: 12px 16px;
            font-size: 16px;
            border: 1.5px solid #d0d5dd;
            border-radius: 8px;
            background: #fafbfc;
            transition: all 0.2s ease;
            outline: none;
            color: #1a1a1a;
            -webkit-appearance: none;
            appearance: none;
        }
        
        .form-group input:focus {
            border-color: #3b82f6;
            background: #ffffff;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.08);
        }
        
        .form-group input::placeholder {
            color: #b0b5be;
        }
        
        .btn-submit {
            width: 100%;
            padding: 12px 16px;
            background: #1a1a1a;
            color: #ffffff;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            -webkit-tap-highlight-color: transparent;
            touch-action: manipulation;
        }
        
        .btn-submit:hover {
            background: #333333;
        }
        
        .btn-submit:active {
            transform: scale(0.97);
            background: #444444;
        }
        
        .error-msg {
            margin-top: 14px;
            padding: 10px 14px;
            background: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 8px;
            color: #991b1b;
            font-size: 13px;
            display: none;
            align-items: center;
            gap: 8px;
        }
        
        .error-msg.show {
            display: flex;
        }
        
        .error-msg::before {
            content: '⚠️';
            font-size: 14px;
        }
        
        .footer-line {
            margin-top: 24px;
            padding-top: 20px;
            border-top: 1px solid #e8ecf1;
            text-align: center;
            font-size: 12px;
            color: #b0b5be;
        }
        
        /* ===== 移动端自适应 ===== */
        @media (max-width: 480px) {
            body { padding: 16px; }
            .login-container {
                padding: 32px 24px;
                border-radius: 12px;
                max-width: 100%;
            }
            .lock-icon {
                width: 48px;
                height: 48px;
                font-size: 20px;
            }
            .login-header h1 { font-size: 20px; }
            .login-header p { font-size: 13px; }
            .form-group input {
                padding: 14px 16px;
                font-size: 16px;
            }
            .btn-submit {
                padding: 14px 16px;
                font-size: 16px;
            }
        }
        
        @media (min-width: 481px) and (max-width: 768px) {
            .login-container {
                padding: 40px 36px;
                max-width: 380px;
            }
        }
        
        @media (min-width: 1200px) {
            .login-container {
                padding: 56px 48px;
                max-width: 440px;
            }
        }
        
        /* ===== 暗黑模式 ===== */
        @media (prefers-color-scheme: dark) {
            body { background: #0f1117; }
            .login-container {
                background: #1a1d23;
                border-color: #2d3139;
                box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
            }
            .login-header h1 { color: #e8eaed; }
            .login-header p { color: #9aa0a8; }
            .lock-icon {
                border-color: #3d424a;
                color: #9aa0a8;
            }
            .form-group label { color: #d1d5db; }
            .form-group input {
                background: #252a32;
                border-color: #3d424a;
                color: #e8eaed;
            }
            .form-group input:focus {
                border-color: #3b82f6;
                background: #2d323a;
                box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
            }
            .form-group input::placeholder { color: #6b7280; }
            .btn-submit { background: #3b82f6; }
            .btn-submit:hover { background: #2563eb; }
            .btn-submit:active { background: #1d4ed8; }
            .footer-line {
                border-top-color: #2d3139;
                color: #6b7280;
            }
            .error-msg {
                background: #2d1a1a;
                border-color: #4a2222;
                color: #fca5a5;
            }
        }
        
        /* ===== 横屏适配 ===== */
        @media (max-width: 480px) and (orientation: landscape) {
            body { padding: 12px; }
            .login-container {
                padding: 20px 24px;
                max-width: 360px;
            }
            .login-header {
                margin-bottom: 16px;
            }
            .lock-icon {
                width: 32px;
                height: 32px;
                font-size: 14px;
                margin-bottom: 8px;
            }
            .login-header h1 { font-size: 17px; }
            .login-header p { font-size: 12px; }
            .form-group {
                margin-bottom: 12px;
            }
            .form-group input {
                padding: 8px 14px;
                font-size: 14px;
            }
            .btn-submit {
                padding: 10px 16px;
                font-size: 14px;
            }
            .footer-line {
                margin-top: 12px;
                padding-top: 12px;
            }
        }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="login-header">
            <div class="lock-icon">🔒</div>
            <h1>请输入访问密码</h1>
            <p>此区域受密码保护</p>
        </div>
        
        <form id="loginForm" method="POST" action="/secret">
            <div class="form-group">
                <label for="password">密码</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    placeholder="请输入密码" 
                    autofocus 
                    required
                    autocomplete="current-password"
                >
            </div>
            <button type="submit" class="btn-submit">验证访问</button>
            <div id="errorMsg" class="error-msg">密码错误，请重试</div>
        </form>
        
        <div class="footer-line">加密内容 · 请输入正确密码</div>
    </div>
    
    <script>
        // 检测错误参数
        const params = new URLSearchParams(window.location.search);
        if (params.get('error') === '1') {
            const errorMsg = document.getElementById('errorMsg');
            errorMsg.classList.add('show');
            document.getElementById('password').focus();
        }
        
        // 表单提交验证
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            const password = document.getElementById('password').value.trim();
            if (!password) {
                e.preventDefault();
                const errorMsg = document.getElementById('errorMsg');
                errorMsg.textContent = '⚠️ 请输入密码';
                errorMsg.classList.add('show');
            }
        });
        
        // 输入时隐藏错误
        document.getElementById('password').addEventListener('input', function() {
            const errorMsg = document.getElementById('errorMsg');
            errorMsg.classList.remove('show');
            errorMsg.textContent = '密码错误，请重试';
        });
        
        // 移动端：点击空白收起键盘
        document.addEventListener('touchstart', function(e) {
            if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'BUTTON') {
                document.activeElement && document.activeElement.blur();
            }
        });
    </script>
</body>
</html>
`;

// ============================================
// 核心拦截逻辑
// ============================================
export async function onRequest(context) {
    const { request, env, next } = context;
    const url = new URL(request.url);
    const path = url.pathname;

    // ===== 1. 判断是否需要加密 =====
    const needsAuth = path.startsWith(PROTECTED_PREFIX) || 
                      path.startsWith('/secret/');

    // ===== 2. 静态资源放行（图片、CSS、JS等） =====
    const staticFilePattern = /\.(png|jpg|jpeg|gif|svg|webp|ico|css|js|json|woff2?|ttf|eot|mp4|webm|pdf)$/i;
    if (staticFilePattern.test(path)) {
        return next();
    }

    // ===== 3. 公开路径直接放行 =====
    if (!needsAuth) {
        return next();
    }

    // ===== 4. 检查会话 Cookie =====
    const cookie = request.headers.get('Cookie') || '';
    const sessionMatch = cookie.match(/session_token=([^;]+)/);
    
    if (sessionMatch && sessionMatch[1] === env.SESSION_SECRET) {
        // ✅ 已认证，放行
        return next();
    }

    // ===== 5. 处理登录 POST 请求 =====
    if (request.method === 'POST') {
        try {
            const formData = await request.formData();
            const password = formData.get('password');
            
            if (password === env.SECRET_PASSWORD) {
                // ✅ 登录成功，设置 Cookie
                return new Response(null, {
                    status: 302,
                    headers: {
                        'Location': '/secret/',
                        'Set-Cookie': `session_token=${env.SESSION_SECRET}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=7200`
                    }
                });
            }
        } catch (e) {
            // 表单解析失败，继续
        }
        
        // ❌ 密码错误
        return new Response(null, {
            status: 302,
            headers: {
                'Location': '/secret?error=1'
            }
        });
    }

    // ===== 6. 未认证：显示登录页 =====
    return new Response(LOGIN_PAGE, {
        status: 401,
        headers: {
            'Content-Type': 'text/html; charset=utf-8'
        }
    });
}