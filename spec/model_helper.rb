
def new_project_hash(name: Faker::Name.name, platform: Project.platforms.keys.sample, card_colour: Project::CARD_COLOURS.sample)
  {
      name: name,
      platform: platform,
      card_colour: card_colour
  }
end