const passport = require('passport')

module.exports = class PassportAuth {

    constructor({
        app, // express app
        io, // optional socket.io
        user,
        redisClient,
        loginPage,
        sessionSecret,
        expires
    }={}){

        this.opts = arguments[0]

        const session = require('express-session')
        let RedisStore = require('connect-redis')(session)
        this.sessionStore = new RedisStore({client: redisClient})

        let cookie = {}

        if( expires == 'never' || expires === false )
            expires = new Date(253402300000000) // effectively never

        if( expires )
            cookie.expires = expires

        app.use(session({
            store: this.sessionStore,
            secret: sessionSecret || process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie
        }))

        passport.serializeUser(this.serializeUser.bind(this))
        passport.deserializeUser(this.deserializeUser.bind(this))

        app.use(passport.initialize());
        app.use(passport.session());

        app.get('/login', this.loginPage.bind(this))
        app.get('/logout', this.logoutPage.bind(this))

        // now setup socket.io
        if( io ){
            // make sure user is authenticated when using Socket.io
            io.use(require('passport.socketio').authorize({
                key: 'connect.sid',
                secret: sessionSecret || process.env.SESSION_SECRET,
                store: this.sessionStore,
                passport: passport,
                cookieParser: require('cookie-parser')
            }));
        }
    }

    serializeUser(user, done){
        done(null, user.id);
    }

    async deserializeUser(id, done){
        this.opts.user.deserializeUser(id).then(user=>{
            done(null, user)
        }, err=>{
            done(err)
        })
    }

    loginPage(req, res){
        
        if( req.isAuthenticated() )
            return res.redirect('/')

        res.sendFile(this.opts.loginPage)

    }

    logoutPage(req, res){
        
        this.opts?.onLogout?.(req, res)

        req.user&&req.user.logout()
        req.logout()
        res.redirect('/login')
    }

    use(){ return passport.use(...arguments) }

    useLocalStrategy(opts){
        const LocalStrategy = require('passport-local').Strategy
        
        this.use(new LocalStrategy({
            passReqToCallback: true,
            ...opts
        }, async (req, username, password, done)=>{
            this.opts.user.login(username, password, req)
                .then(user=>done(null, user))
                .catch(err=>done(err))
        }));

        this.opts.app.post('/login', (req, res, next)=>{
            this.authenticate({req, res, next, type: 'local'});
        });
    }

    authenticate({
        req, res, next,
        type='local',
        redirect
    }={}){
        return passport.authenticate(type, (err, user, info)=>{

            if(err) {
                return res.status(401).send({error:err.message, trace: err.trace});
            }

            req.login(user, err=>{
                if( err )
                    return res.status(500).send({error:err.message, trace: err.trace});

                user.req = req

                if( redirect )
                    res.redirect(redirect);
                else
                    res.json(user);
            })

        })(req, res, next)
    }
}
