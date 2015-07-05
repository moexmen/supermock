//=require ./tabs

Parser.Mappers.Tabs.Tab = Parser.Mappers.Tabs.Tab || {};

Parser.Mappers.Tabs.Tab.map = function(parent_element, element_type, properties) {
    if(parent_element.constructor != Elements.Tabs || element_type != 'tab') {
        return null;
    }

    return new Elements.Tabs.Tab(properties);
};