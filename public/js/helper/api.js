class Api {
    static props = {
		header: '',
		body: '',
		host: 'localhost',
		port: 2222,
		path: '',
		headers: {}
	}

    static __get(params = this.props){
		return new Promise((result, reject) => {
            let origin = (params.host || '/') + (params.port || '') + (params.path || '');

			try {
				fetch(origin, params.headers).then( (res, err) => {
					if(err){
						reject(err);
						return;
					}
					res.json().then( (res, err) => {
						if(err){
							reject(err);
							return;
						}
						result(res);
					})
				} )
			} catch (err) {
				reject(err);
				return;
			}
		})
	}

    static __post(params = this.props, value){
        return new Promise((resolve, reject) => {
            let config = {
                method: 'POST',
                body: JSON.stringify(value),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            };

            let origin = (params.host || '/') + (params.port || '') + (params.path || '');

            fetch(origin, config).then((response) => {
                Api.__error(response, resolve, reject)
            }).catch((err)=>{
               reject(err);
            });
        })
    }

    static __error(response, resolve, reject){
        switch(response.status){
            case 200:
                response.json().then((result) => {
                    resolve(result);
                }).catch((err) => {reject(err)})

                break;

            default:

                response.json().then((err) => {
                    reject(err.message || err);
                }).catch((err) => {reject(err)})
        }
    }
}

export default Api;
