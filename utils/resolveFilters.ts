export const resolveFilters = async (model: string, context?: any) => {
    try {
      const configFileName = `${model}-filters`
      const configModule = await import(`~/configs/filters/${configFileName}.ts`)
      const filtersConfig = configModule[`${model}Filters`]
      
      if (!filtersConfig) {
        return []
      }
      
      // Traiter chaque filtre et exécuter les fonctions getOptions
      const processedFilters = await Promise.all(
        filtersConfig.map(async (filter: any) => {
          let options = filter.options
          
          // Si le filtre a une fonction getOptions, l'exécuter
          if (filter.getOptions && typeof filter.getOptions === 'function') {
            try {
              options = await filter.getOptions(context)
            } catch (error) {
              console.error(`Erreur lors du chargement des options pour ${filter.name}:`, error)
              options = []
            }
          }
          
          return {
            ...filter,
            field: filter.name,
            label: filter.label,
            type: filter.type,
            options: options,
          }
        })
      )
      
      return processedFilters
      
    } catch (error) {
      console.warn(`Erreur lors du chargement des filtres pour ${model}:`, error)
      return []
    }
  }