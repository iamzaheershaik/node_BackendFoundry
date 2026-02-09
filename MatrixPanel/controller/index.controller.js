exports.dashboard = async(req, res) => {
    try{
        return res.render("dashboard")
    }catch(error){
        console.log(error);
        return res.redirect("/")
    }
}