const { Provider } = require ('../models')
const getProviders = async (req, res) => {
    try {
        const providers = await Provider.findAll()

        res.status(200).json(providers)
    }catch (error) {
        res.status(500).json({
            message: 'Error obtaining providers',
            error: error.message
        })
    }
};
const getProviderById = async (req, res) => {
try{
    const {id} = req.params

    const provider = await Provider.findByPk(id)

    if (!provider) {
        return res.status(404).json({
            message: 'Provider not found'
        });
    }
      res.status(200).json(provider)
    }catch (error) {
        res.status(500).json({
           message: 'Error obtaining provider',
           error:error.message
       });
    }
};
const createProvider = async (req, res) => {
    try {
        const { name, phone, email, city } = req.body

        const provider = await Provider.create({
            name,
            phone,
            email,
            city
        });

        res.status(201).json(provider)
    }catch (error) {
        res.status(400).json({
            message: 'Error creating provider',
            error: error.message
        })
    }
};
const updateProvider = async (req, res) => {
try  {
     const {id} = req.params

     const provider = await Provider.findByPk(id)

     if (!provider) {
        return res.status(404).json({
            message: 'Provider not found'
        });
    }
    await provider.update (req.body)  
    
    res.status(200).json(provider)
    
}catch (error) {
        res.status(400).json({
           message: 'Error obtaining provider',
           error:error.message
       });
    }
}
    const deleteProvider = async (req, res) => {
    try {
        const { id } = req.params;

        const provider = await Provider.findByPk(id);

        if (!provider) {
            return res.status(404).json({
                message: 'Provider not found'
            });
        }

        await provider.destroy();

        res.status(200).json({
            message: 'Provider deleted successfully'
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error deleting provider',
            error: error.message
        });
    }
};

module.exports= {
    getProviders,
    getProviderById,
    createProvider,
    updateProvider,
    deleteProvider
}