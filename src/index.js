import dva from 'dva';
import './index.less';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/app').default);
app.model(require('./models/home').default);
app.model(require('./models/user').default);
app.model(require('./models/hospital').default);
app.model(require('./models/template').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
