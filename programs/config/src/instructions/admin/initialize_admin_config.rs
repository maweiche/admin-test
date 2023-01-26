use crate::program::Config;
use crate::state::AdminConfig;
use crate::USDC_MINT_PUBKEY;
use anchor_lang::prelude::*;
use anchor_spl::token::TokenAccount;

#[derive(Accounts)]
pub struct InitializeAdminConfig<'info> {

}

pub fn initialize_admin_config_handler(ctx: Context<InitializeAdminConfig>) -> Result<()> {

}
